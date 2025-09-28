import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService, Car } from '../services/car.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-car',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss'
})
export class AddCarComponent {
  car: Omit<Car, 'id'> = {
    brand: '',
    model: '',
    year: undefined,
    license_plate: undefined,
    current_mileage: undefined,
    fuel_type: undefined
  };

  isSubmitting = false;

  constructor(
    private carService: CarService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return this.car.brand.trim().length > 0 && this.car.model.trim().length > 0;
  }

  onSubmit(form: any) {
    if (this.isFormValid() && !this.isSubmitting) {
      this.isSubmitting = true;

      // Nettoyer les données avant l'envoi
      const carData: Omit<Car, 'id'> = {
        brand: this.car.brand.trim(),
        model: this.car.model.trim()
      };

      // Ajouter les champs optionnels seulement s'ils ont une valeur
      if (this.car.year) {
        carData.year = this.car.year;
      }
      if (this.car.license_plate && this.car.license_plate.trim()) {
        carData.license_plate = this.car.license_plate.trim();
      }
      if (this.car.current_mileage !== undefined && this.car.current_mileage !== null) {
        carData.current_mileage = this.car.current_mileage;
      }
      if (this.car.fuel_type && this.car.fuel_type.trim()) {
        carData.fuel_type = this.car.fuel_type;
      }

      this.carService.addCar(carData).subscribe({
        next: (savedCar) => {
          this.notificationService.showSuccess(
            `La voiture ${savedCar.brand} ${savedCar.model} a été ajoutée avec succès !`
          );

          // Rediriger vers le tableau de bord après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la voiture:', error);
          this.notificationService.showError(
            'Erreur lors de l\'ajout de la voiture. Réessaie.'
          );
          this.isSubmitting = false;
        }
      });
    }
  }
}
