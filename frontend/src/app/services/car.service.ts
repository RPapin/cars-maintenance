import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
  id?: number;
  brand: string;
  model: string;
  year?: number;
  license_plate?: string;
  current_mileage?: number;
  fuel_type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/api'; // Port du serveur Express

  constructor(private http: HttpClient) { }

  addCar(car: Omit<Car, 'id'>): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/cars`, car);
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

  updateCar(id: number, car: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/cars/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cars/${id}`);
  }
}
