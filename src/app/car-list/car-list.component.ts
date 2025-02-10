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
  getCars(): void {
    this.http.get<any[]>('http://localhost:3000/api/cars-to-sell-with-image').subscribe(
      (response) => {
        this.items = response; // sind alle Auto die zum Verkauf stehn
        console.log(this.items);

        for (let i = 0; i < this.items.length; i ++) {
          if (this.items[i].image != null) {
            console.log(this.items[i].image.data);
            console.log("regDate" + this.items[i].regristationDate);
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
