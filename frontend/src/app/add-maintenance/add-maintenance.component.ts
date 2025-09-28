import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MaintenanceService, Maintenance } from '../services/maintenance.service';
import { CarService, Car } from '../services/car.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-maintenance',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-maintenance.component.html',
  styleUrl: './add-maintenance.component.scss'
})
export class AddMaintenanceComponent implements OnInit {
  maintenance: Omit<Maintenance, 'id'> = {
    cars_id: null as any,
    name: '',
    date: '',
    mileage: null as any,
    cost: undefined
  };

  cars: Car[] = [];
  isSubmitting = false;
  isLoadingCars = true;

  constructor(
    private maintenanceService: MaintenanceService,
    private carService: CarService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCars();
    this.setTodayDate();
  }

  loadCars() {
    this.isLoadingCars = true;
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.isLoadingCars = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
        this.notificationService.showError('Erreur lors du chargement des voitures');
        this.isLoadingCars = false;
      }
    });
  }

  setTodayDate() {
    const today = new Date();
    this.maintenance.date = today.toISOString().split('T')[0];
  }


  onSubmit(form: any) {

    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const maintenanceData: Omit<Maintenance, 'id'> = {
        cars_id: this.maintenance.cars_id,
        name: this.maintenance.name.trim(),
        date: this.maintenance.date,
        mileage: this.maintenance.mileage
      };

      // Ajouter le coût s'il a une valeur
      if (this.maintenance.cost !== undefined && this.maintenance.cost !== null && this.maintenance.cost >= 0) {
        maintenanceData.cost = this.maintenance.cost;
      }

      this.maintenanceService.addMaintenance(maintenanceData).subscribe({
        next: (savedMaintenance) => {
          this.notificationService.showSuccess(
            `La maintenance a été enregistrée avec succès !`
          );

          // Rediriger vers la liste des maintenances après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/maintenance-list']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la maintenance:', error);
          this.notificationService.showError(
            'Erreur lors de l\'enregistrement de la maintenance. Réessaie.'
          );
          this.isSubmitting = false;
        }
      });
    }
  }
}
