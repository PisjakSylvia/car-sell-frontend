import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CarListComponent } from "../car-list/car-list.component";
import { CarFilterService } from '../services/car-filter.service';  // Importiere den Service

@Component({
  selector: 'app-car-search',
  imports: [ CommonModule, HttpClientModule, FormsModule, CarListComponent],
  templateUrl: './car-search.component.html',
  styleUrl: './car-search.component.css'
})
export class CarSearchComponent {
  vehicleType: string = '';
  selectedBrand: string = "Marke"; // eig der default
  selectedModel: string = '';
  selectedDescription: string = '';
  selectedMileage: string = '';
  selectedRegistrationdate: string = '';
  selectedPrice: number = 0;
  onlyNewCars: boolean = false;

  constructor(private http: HttpClient, private carFilterService: CarFilterService) { }
  

  // Wenn das Formular abgesendet wird ->  Daten an den Service senden
  onFormSubmit() {
    const mileage = this.selectedMileage ? parseInt(this.selectedMileage, 10) : null;

    const formData = {
      brand: this.selectedBrand || null,
      model: this.selectedModel || null,
      type: this.selectedVehicle || null,
      description: this.selectedDescription || null,
      mileage: mileage || null,
      registrationdate: this.selectedRegistrationdate || null,
      price: this.selectedPrice || null,
    };
  
    console.log("formData ", formData);
  
    // Formulardaten an den Service übergeben
    this.carFilterService.setFilterData(formData);
  }
  

// In your component TS file
handleButtonClick(): void {
  this.countCars();
  this.onFormSubmit();
}

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
    console.log(vehicleType);
    console.log(this.selectedVehicle);

  }
  isSelected(vehicleType: string): boolean {
    return this.selectedVehicle === vehicleType;
  }

  // abfragen, welche Marken es bereits in der DB gibt
  // diese dann als options bei der Markenauswahl 
  // in html -> [(ngModel)] ist Two-Way-Datenbindung das den Wert eines Formularsteuerelements 
  //            mit einer Komponenteneigenschaft synchronisiert
  //         -> verbindet zB ausgewählte Marke mit "eigenschaft" selectedBrand im ts
  //         -> Marke wird in selectedBrand gespeichert
  brands: string[] = []; 
  loadBrands(): void {
    console.log(this.selectedBrand);
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
