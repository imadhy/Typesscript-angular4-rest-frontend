// Modules imports
import { NotificationService } from './../../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

// Models and services imports
import { Car } from './../Car.model';
import { Driver } from '../../driver/driver.model';
import { CarService } from './../services/car.service';
import { DriverService } from '../../driver/services/driver.service';

import * as _ from 'underscore';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  @ViewChild('deleteModal') deleteModal;

  private title = 'Car Form';
  private car: Car;
  private form: FormGroup;
  private ids;
  private bsConfig: Partial<BsDatepickerConfig>;

  private driverData: Driver[];

  dateOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    closeSelectorOnDocumentClick: true
  };

  constructor(
    private _carService: CarService,
    private _driverService: DriverService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  ngOnInit() {
    this.getIdFromRouteParams();
    this.fetchDrivers();
    this.initForm();
  }

  getIdFromRouteParams = () => {
    this._route.params.subscribe(p => {
      this.ids = _.values(p);
    });
  }

  fetchDrivers = () => {
    this._driverService.getAll().subscribe(
      (data: Driver[]) => this.driverData = data,
      error => console.error(error));
  }

  initForm = () => {
    this.form = this._formBuilder.group(this.getNewForm());
    if (!_.isEmpty(this.ids)) {
      this.load();
    }
  }

  getNewForm = () => {
    return {
      id: [
        '',
        Validators.required
      ],
      name: [
        '',
        Validators.required
      ],
      year: [
        '',
        Validators.required
      ],
      price: [
        '',
        Validators.required
      ],
      brand: [
        '',
        Validators.required
      ],
      driver: [
        '',
        Validators.required
      ],
    };
  }

  load = () => {
    this._carService.getSingle(this.ids).subscribe(
      (car: Car) => {
        this.car = car;
        this.form.setValue({
          id: car.id,
          name: car.name,
          year: car.year,
          price: car.price,
          brand: car.brand,
          driver: car.driver
        });
      },
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  save = () => {
    // If we didn't get a author, we are adding a author
    if (_.isEmpty(this.ids)) {
      this.add();
    } else { // If we didn't get a author, we are adding a author
      this.update();
    }
  }

  add = () => {
    this._carService.add(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Car added successfuly');
        this._router.navigate(['./car-form', this.form.value.id]);
      },
      error => {
        if (error.status === this.CONFLICT_ERROR) {
          this._notificationService.error(error.statusText, 'Id already used in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  update = () => {
    this._carService.update(<Car>this.form.getRawValue(), this.ids).subscribe(
      result => this._notificationService.success('Success', 'Car edited successfuly'),
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  openDeleteModal() {
    this.deleteModal.open();
  }

  confirmDelete() {
    this._carService.delete(this.car.id).subscribe(
      result => {
        this._router.navigate(['./car-list']);

        this._notificationService.success(
          'Deleted',
          `The car entry with the id(s)='${this.car.id}' was deleted successfuly`);
      },
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });

    this.deleteModal.close();
  }
}
