import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component';
import { CarListComponent } from './car-list/car-list.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'ajouter-voiture', redirectTo: 'add-car' },
  { path: 'car-list', component: CarListComponent },
  { path: 'liste-voitures', redirectTo: 'car-list' },
  { path: 'ajouter-maintenance', component: AddMaintenanceComponent },
  { path: 'maintenance-list', component: MaintenanceListComponent },
  { path: 'liste-maintenances', redirectTo: 'maintenance-list' },
  { path: '**', redirectTo: '' }
];
