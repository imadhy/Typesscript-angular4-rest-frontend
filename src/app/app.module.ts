import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { SidebarModule } from 'ng-sidebar';

import { HomeListComponent } from './home-list/home-list.component';
import { CarListComponent } from './entities/car/car-list/car-list.component';
import { CarFormComponent } from './entities/car/car-form/car-form.component';

// Routing
import { routing } from './app.routing';

// Services
import { Configuration } from './app.configuration';
import { EmitterService } from './services/emitter.service';
import { PagerService } from './services/pager.service';

// Entities Services
import { CarService } from './entities/car/services/car.service';
import { NotificationService } from './services/notification.service';

// Node Modules
import { ModalModule } from 'ngx-modal';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeListComponent,
    CarListComponent,
    CarFormComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    ModalModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule,
    BsDatepickerModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    SidebarModule.forRoot()
  ],
  providers: [
    Configuration,
    EmitterService,
    PagerService,
    CarService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
