import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-car-list',
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  items: any[] = [];

  newCar: any = {
    description: '',
    price: null,
    regristationDate: '',
    mileage: null,
    fuel: '',
    color: '',
    condition: '',
    carsId: ''
  }; // new car-to-sell 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.http.get<any[]>('http://localhost:3000/api/cars-to-sell').subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }



  addCar(): void {
    // funktionier noch nict zu 100%
    this.http.post('http://localhost:3000/api/cars-to-sell', this.newCar).subscribe(
      (response) => {
        console.log('Car added:', response);
        this.items.push(response); // Neues Auto zur Liste hinzufügen
        this.newCar = {
          description: '',
          price: null,
          regristationDate: '',
          mileage: null,
          fuel: '',
          color: '',
          condition: '',
          carsId: ''
        }; // Formular zurücksetzen
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


}
