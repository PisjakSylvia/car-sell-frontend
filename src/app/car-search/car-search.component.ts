import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-search',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './car-search.component.html',
  styleUrl: './car-search.component.css'
})
export class CarSearchComponent {
  constructor(private http: HttpClient) { }
  
  counter = 0;
  ngOnInit(): void {
    this.countCars();
    this.loadBrands();
  }
  // methode für den Button, mit dem man die Autos anzeigen kann
  // counted wieviele cars-to-sell es gibt
  countCars(): void {
    this.http.get<any[]>('http://localhost:3000/api/cars-to-sell').subscribe(
      (response) => {
        this.counter = response.length;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // speichert welchen Type man ausgewählt hat bei den Bildern
  // in html -> [ngClass] Angular-Direktive mit der man CSS-Klassen dynamisch anwenden kann
  //         -> wenn isSelected() = true -> css "Klasse" selected wird aufs img angewendet
  selectedVehicle = "";
  selectVehicle(vehicleType: string): void {
    this.selectedVehicle = vehicleType;
  }
  isSelected(vehicleType: string): boolean {
    return this.selectedVehicle === vehicleType;
  }

  // abfragen, welche Marken es bereits in der DB gibt
  // diese dann als options bei der Markenauswahl 
  brands: string[] = []; 
  
  loadBrands(): void {
    this.http.get<any[]>('http://localhost:3000/api/car-brands').subscribe(
      (response) => {
        this.brands = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
