import { Router, RouterModule } from '@angular/router';

// Components
import { HomeListComponent } from './home-list/home-list.component';
import { CarListComponent } from './entities/car/car-list/car-list.component';
import { CarFormComponent } from './entities/car/car-form/car-form.component';

export const routing = RouterModule.forRoot([
    { path: '', component: HomeListComponent },
    { path: 'car-list', component: CarListComponent },
    { path: 'car-form/:id', component: CarFormComponent },
    { path: 'car-form', component: CarFormComponent }
]);
