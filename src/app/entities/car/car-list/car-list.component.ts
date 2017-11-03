import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// Services imports
import { PagerService } from './../../../services/pager.service';
import { EmitterService } from './../../../services/emitter.service';
import { CarService } from './../services/car.service';
import { NotificationService } from './../../../services/notification.service';

// Models imports
import { Car } from '../car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;
  private carIdToDelete: number;

  private listOfCars: Car[];
  private listId = 'CAR_COMPONENT_LIST';

  private title = 'List of Cars';

  // pager object
  private pager: any = {};
  // paged items
  private pagedItems: any[];

  constructor(
    private _carService: CarService,
    private _router: Router,
    private _notificationService: NotificationService,
    private pagerService: PagerService) { }

  ngOnInit() {
    // On init get all Cars
    this.getAllCars();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Car list
    EmitterService.get(this.listId).subscribe((data: Car[]) => this.getAllCars());
  }

  /**
   * Get all Cars using the service CarService
   */
  getAllCars = (): void => {
    this._carService.getAll().subscribe(
      (data: Car[]) => {
        this.listOfCars = data;
        // this.setPage(1);
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
      });
  }

  confirmDelete() {
    this._carService.delete(this.carIdToDelete).subscribe(
      result => {
        // Notify Badge list to refresh
        EmitterService.get(this.listId).emit(result);

        this._notificationService.success(
          'Deleted',
          `The car entry with the id='${this.carIdToDelete}' was deleted successfuly`);
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
      });

    this.deleteModal.close();
  }

  openDeleteModal(carID) {
    this.carIdToDelete = carID;
    this.deleteModal.open();
  }
}
