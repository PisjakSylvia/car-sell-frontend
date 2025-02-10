import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CarFilterService } from '../services/car-filter.service';  // Importiere den Service

@Component({
  selector: 'app-car-list',
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  items: any[] = [];
  filteredItems: any[] = [];
  filters: any = {};

  newCar: any = {
    description: '',
    price: null,
    registrationDate: '',
    mileage: null,
    fuel: '',
    color: '',
    condition: '',
    carsId: ''
  }; // new car-to-sell 

  constructor(private http: HttpClient, private carFilterService: CarFilterService) { }

  ngOnInit(): void {
    this.getCars();

    // Subscribe to filter changes
    this.carFilterService.filterData$.subscribe(filterData => {
      console.log("filterData " + filterData.brand + filterData.model+ filterData.type+ filterData.description+ filterData.price+ filterData.registrationDate+ filterData.mileage );
      this.filters = filterData || {};  // Store the latest filter data
      this.getCars();  // Fetch cars based on the updated filters
    });
  } 
  
  

  
  // https://base64.guru/converter/encode/image/jpg zum encoden des Bilders für die DB
  // mit getCars() bekommt man alle Attribute vom zu verkaufenden Auto
  // die images werden in der DB als binäre Datei gespeichert
  // Zuerst schaut man, ob fürs angelegte Auto (items[i])
  // ein image existiert. Wenn eines existiert, dann 
  // -> this.items[i].image.data -> gibt den Inhalt der "Datei"/image aus als Array von Zahlen
  // -> ... .map((c: number) => String.fromCharCode(c)) -> c ist ein Element des Arrays und jedes wird in das entsprechende unicode umgewandelt
  // -> ... .join('') -> verbinded alle Zeichen von map miteinander
  // -> wird in rawImage gespeichert.
  // data:image/jpeg;base64, ist ein Präfix, der kennzeichnet, dass es ein Base64 Format ist (JPEG-Bild)
  /*getCars(): void {
    this.http.get<any[]>('http://localhost:3000/api/cars-to-sell-with-image').subscribe(
      (response) => {
        this.items = response; // sind alle Auto die zum Verkauf stehn
        console.log(this.items);
        this.filteredItems = this.items;  // Initially display all cars

        for (let i = 0; i < this.items.length; i ++) {
          if (this.items[i].image != null) {
            console.log(this.items[i].image.data);
            console.log("regDate" + this.items[i].registrationDate);
            let rawImage = this.items[i].image.data.map((c: number) => String.fromCharCode(c)).join('');
            this.items[i].imageReady = "data:image/jpeg;base64," + rawImage;
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }*/


  // Construct the query URL with active filters
  buildQueryParams(filters: any): string {
    const queryParams = [];
  
    // Dynamisch die Filter hinzufügen
    if (filters.brand && filters.brand != "Marke") {
      queryParams.push(filters.brand);
    } else {
      queryParams.push("null");
    }
    if (filters.model) {
      queryParams.push(filters.model);
    } else {
      queryParams.push("null");
    }
    if (filters.type) {
      queryParams.push(filters.type);
    } else {
      queryParams.push("null");
    }
    if (filters.description) { 
      queryParams.push(filters.description);
    } else {
      queryParams.push("null");
    }
    if (filters.price) {
      queryParams.push(filters.price);
    } else {
      queryParams.push("null");
    }
    if (filters.registrationdate) {
      queryParams.push(filters.registrationdate);
    } else {
      queryParams.push("null");
    }
    if (filters.mileage) {
      queryParams.push(filters.mileage);
    } else {
      queryParams.push("null");
    }
  
    // Füge die Parameter mit "/" als Trennzeichen zusammen
    return queryParams.length > 0 ? `/${queryParams.join('/')}` : '';
  }

// Fetch cars based on the current filters
getCars(): void {
  if (!this.filters) return;  // Ensure filters are defined before making the request

  const queryParams = this.buildQueryParams(this.filters);  // Get the query string based on active filters
  console.log("query " + queryParams);
  this.http.get<any[]>(`http://localhost:3000/api/cars-to-sell-with-image${queryParams}`).subscribe(
    (response) => {
      this.items = response; 
      console.log(this.items);

      // Handle image processing for the cars
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].image != null) {
          let rawImage = this.items[i].image.data.map((c: number) => String.fromCharCode(c)).join('');
          this.items[i].imageReady = "data:image/jpeg;base64," + rawImage;
        }
      }
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}
}
