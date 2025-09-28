import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService, Car } from '../services/car.service';
import { MaintenanceService, MaintenanceWithCar } from '../services/maintenance.service';

@Component({
  selector: 'app-landing',
  imports: [RouterModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  cars: Car[] = [];
  maintenances: MaintenanceWithCar[] = [];
  isLoadingCars = true;
  isLoadingMaintenances = true;

  constructor(
    private carService: CarService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {
    this.loadCars();
    this.loadMaintenances();
  }

  loadCars() {
    this.isLoadingCars = true;
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars.slice(0, 5); // Afficher seulement les 5 dernières
        this.isLoadingCars = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
        this.isLoadingCars = false;
      }
    });
  }

  loadMaintenances() {
    this.isLoadingMaintenances = true;
    this.maintenanceService.getMaintenances().subscribe({
      next: (maintenances) => {
        this.maintenances = maintenances.slice(0, 5); // Afficher seulement les 5 dernières
        this.isLoadingMaintenances = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des maintenances:', error);
        this.isLoadingMaintenances = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }
}
