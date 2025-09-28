import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CarService, Car } from '../services/car.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-car-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  editingCarId: number | null = null;
  editingCar: Car | null = null;
  isLoading = false;

  constructor(
    private carService: CarService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.isLoading = true;
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
        this.notificationService.showError('Erreur lors du chargement des voitures');
        this.isLoading = false;
      }
    });
  }

  startEdit(car: Car) {
    this.editingCarId = car.id!;
    this.editingCar = { ...car };
  }

  cancelEdit() {
    this.editingCarId = null;
    this.editingCar = null;
  }

  saveEdit() {
    if (this.editingCar && this.editingCarId) {
      if (!this.editingCar.brand?.trim() || !this.editingCar.model?.trim()) {
        this.notificationService.showError('La marque et le modèle sont obligatoires');
        return;
      }

      const carData = {
        brand: this.editingCar.brand.trim(),
        model: this.editingCar.model.trim(),
        year: this.editingCar.year || undefined,
        license_plate: this.editingCar.license_plate?.trim() || undefined,
        current_mileage: this.editingCar.current_mileage || undefined,
        fuel_type: this.editingCar.fuel_type?.trim() || undefined
      };

      this.carService.updateCar(this.editingCarId, carData).subscribe({
        next: (updatedCar) => {
          const index = this.cars.findIndex(c => c.id === this.editingCarId);
          if (index !== -1) {
            this.cars[index] = updatedCar;
          }
          this.notificationService.showSuccess('Voiture mise à jour avec succès');
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.notificationService.showError('Erreur lors de la mise à jour de la voiture');
        }
      });
    }
  }

  deleteCar(car: Car) {
    if (confirm(`Es-tu sûr de vouloir supprimer la voiture ${car.brand} ${car.model} ?`)) {
      this.carService.deleteCar(car.id!).subscribe({
        next: () => {
          this.cars = this.cars.filter(c => c.id !== car.id);
          this.notificationService.showSuccess('Voiture supprimée avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.notificationService.showError('Erreur lors de la suppression de la voiture');
        }
      });
    }
  }

  navigateToAddCar() {
    this.router.navigate(['/add-car']);
  }

  isEditing(carId: number): boolean {
    return this.editingCarId === carId;
  }
}
