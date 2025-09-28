import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MaintenanceService, MaintenanceWithCar } from '../services/maintenance.service';
import { CarService, Car } from '../services/car.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-maintenance-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './maintenance-list.component.html',
  styleUrl: './maintenance-list.component.scss'
})
export class MaintenanceListComponent implements OnInit {
  maintenances: MaintenanceWithCar[] = [];
  cars: Car[] = [];
  editingMaintenanceId: number | null = null;
  editingMaintenance: MaintenanceWithCar | null = null;
  isLoading = false;

  constructor(
    private maintenanceService: MaintenanceService,
    private carService: CarService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMaintenances();
    this.loadCars();
  }

  loadMaintenances() {
    this.isLoading = true;
    this.maintenanceService.getMaintenances().subscribe({
      next: (maintenances) => {
        this.maintenances = maintenances;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des maintenances:', error);
        this.notificationService.showError('Erreur lors du chargement des maintenances');
        this.isLoading = false;
      }
    });
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
      }
    });
  }

  startEdit(maintenance: MaintenanceWithCar) {
    this.editingMaintenanceId = maintenance.id!;
    this.editingMaintenance = { ...maintenance };
  }

  cancelEdit() {
    this.editingMaintenanceId = null;
    this.editingMaintenance = null;
  }

  saveEdit() {
    if (this.editingMaintenance && this.editingMaintenanceId) {
      if (!this.editingMaintenance.cars_id || !this.editingMaintenance.name?.trim() || !this.editingMaintenance.date || !this.editingMaintenance.mileage) {
        this.notificationService.showError('Tous les champs sont obligatoires');
        return;
      }

      const maintenanceData = {
        cars_id: this.editingMaintenance.cars_id,
        name: this.editingMaintenance.name.trim(),
        date: this.editingMaintenance.date,
        mileage: this.editingMaintenance.mileage,
        cost: this.editingMaintenance.cost !== undefined && this.editingMaintenance.cost !== null ? this.editingMaintenance.cost : undefined
      };

      this.maintenanceService.updateMaintenance(this.editingMaintenanceId, maintenanceData).subscribe({
        next: (updatedMaintenance) => {
          const index = this.maintenances.findIndex(m => m.id === this.editingMaintenanceId);
          if (index !== -1) {
            // Conserver les informations de la voiture
            this.maintenances[index] = {
              ...updatedMaintenance,
              car_brand: this.editingMaintenance!.car_brand,
              car_model: this.editingMaintenance!.car_model,
              car_license_plate: this.editingMaintenance!.car_license_plate
            };
          }
          this.notificationService.showSuccess('Maintenance mise à jour avec succès');
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.notificationService.showError('Erreur lors de la mise à jour de la maintenance');
        }
      });
    }
  }

  isEditing(maintenanceId: number): boolean {
    return this.editingMaintenanceId === maintenanceId;
  }

  deleteMaintenance(maintenance: MaintenanceWithCar) {
    if (confirm(`Es-tu sûr de vouloir supprimer cette maintenance pour ${maintenance.car_brand} ${maintenance.car_model} ?`)) {
      this.maintenanceService.deleteMaintenance(maintenance.id!).subscribe({
        next: () => {
          this.maintenances = this.maintenances.filter(m => m.id !== maintenance.id);
          this.notificationService.showSuccess('Maintenance supprimée avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.notificationService.showError('Erreur lors de la suppression de la maintenance');
        }
      });
    }
  }

  navigateToAddMaintenance() {
    this.router.navigate(['/ajouter-maintenance']);
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

  getTotalCost(): number {
    return this.maintenances.reduce((sum, m) => sum + (m.cost || 0), 0);
  }
}
