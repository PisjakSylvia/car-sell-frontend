import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CarListComponent } from "../car-list/car-list.component";

@Component({
  selector: 'app-car-search',
  imports: [ CommonModule, HttpClientModule, FormsModule, CarListComponent],
  templateUrl: './car-search.component.html',
  styleUrl: './car-search.component.css'
})
export class CarSearchComponent {
  selectedBrand: string = "Marke";
  constructor(private http: HttpClient) { }
  
  counter = 0;
  showCarList = false; // steuert, ob die CarList-Komponente angezeigt wird
  carListButtonText = "Fahrzeuge anzeigen";

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
        this.showCarList = !this.showCarList; // zeigt die CarList-Komponente nach dem Button-Klick an
        this.carListButtonText = this.showCarList ? "Fahrzeuge verbergen" : "Fahrzeuge anzeigen";
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
  models: string[] = []; 
  // Modelle von der ausgewählten Marke laden
  loadModels(): void {
    if (this.selectedBrand) {
      this.http.get<string[]>(`http://localhost:3000/api/car-models/${this.selectedBrand}`).subscribe(
        (response) => {
          this.models = response;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      this.models = []; // wenn keine Marke ausgewählt ist -> nix anzeigen
    }
  }
}
