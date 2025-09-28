import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Maintenance {
  id?: number;
  cars_id: number;
  name: string;
  date: string;
  mileage: number;
  cost?: number;
}

export interface MaintenanceWithCar extends Maintenance {
  car_brand?: string;
  car_model?: string;
  car_license_plate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addMaintenance(maintenance: Omit<Maintenance, 'id'>): Observable<Maintenance> {
    return this.http.post<Maintenance>(`${this.apiUrl}/task`, maintenance);
  }

  getMaintenances(): Observable<MaintenanceWithCar[]> {
    return this.http.get<MaintenanceWithCar[]>(`${this.apiUrl}/task`);
  }

  getMaintenanceById(id: number): Observable<MaintenanceWithCar> {
    return this.http.get<MaintenanceWithCar>(`${this.apiUrl}/task/${id}`);
  }

  updateMaintenance(id: number, maintenance: Partial<Maintenance>): Observable<Maintenance> {
    return this.http.put<Maintenance>(`${this.apiUrl}/task/${id}`, maintenance);
  }

  deleteMaintenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/task/${id}`);
  }

  getMaintenancesByCar(carId: number): Observable<MaintenanceWithCar[]> {
    return this.http.get<MaintenanceWithCar[]>(`${this.apiUrl}/task/car/${carId}`);
  }
}
