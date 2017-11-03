import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _opened = false;
  private title: String = 'Home';

  public navigation = [
    { title: 'Car', routerLink: 'car-list' },
    { title: 'Driver', routerLink: 'driver-list' }
  ];

  public optionsForNotifications = {
    position: ['bottom', 'left'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    preventDuplicates: true
  };

  constructor(private _notificationService: NotificationService) { }

  ngOnInit() {
    this._notificationService.init();
  }

  private _toggleOpened(): void {
    this._opened = !this._opened;
  }
}
