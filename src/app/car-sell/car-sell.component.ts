import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-sell',
  imports: [CommonModule, HttpClientModule,FormsModule ],
  templateUrl: './car-sell.component.html',
  styleUrl: './car-sell.component.css',
  standalone: true 

})
export class CarSellComponent {
  constructor(private http: HttpClient) {}

  dropdownOpen = false;
  selectedColor = { name: '', hex: '' };
  colors = [
    { name: 'Rot', hex: '#f51d1d' },
    { name: 'Orange', hex: '#FF7D00' },
    { name: 'Gelb', hex: '#ffe800' },
    { name: 'Grün', hex: '#b2e602' },
    { name: 'Blau', hex: '#007BFF' },
    { name: 'Violett', hex: '#7a02e6' },
    { name: 'Schwarz', hex: 'black' },
    { name: 'Grau', hex: '#a3a0a6' },
    { name: 'Weiß', hex: 'white' },
    { name: 'Silber', hex: 'silver' },
    { name: 'Gold', hex: 'gold' },
    { name: 'Braun', hex: '#683a1a' },
    { name: 'Beige', hex: '#FCECD0' },
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  carData: any = {
    Marke: '',
    Type: '',
    Model: '',
    price: 0,
    fuel: '',
    condition: '',
    registrationDate: '',
    mileage: 0,
    description: '',
    image: '',
    carsId: '223deac9-b212-4abe-92e4-1e7ae7f83dde' // dawal nur bmw x5
  };
  selectColor(color: { name: string; hex: string }) {
    console.log(color);
    this.selectedColor = color;
    this.carData.color = color.name; 
    this.dropdownOpen = false;
  }

  // Methode zum Konvertieren eines Bildes in Base64
  convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Entfernt Präfix
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  // Methode, die beim Hochladen eines Bilds ausgeführt wird
  handleImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.convertImageToBase64(file).then((base64Image) => {
        this.carData.image = base64Image; // Base64-Daten im carData-Objekt speichern
        console.log('Bild erfolgreich konvertiert:', base64Image);
      }).catch((error) => {
        console.error('Fehler beim Konvertieren des Bildes:', error);
      });
    }
  }
// http://localhost:3000/api/cars-to-sell/War%20ein%20Raucher%20Auto/2499/2009-01-01/191000/Benzin/Gelb/Gebraucht/f5ae3b28-583d-4925-a24b-7517d4796966

  // Methode, um die Autodaten inklusive Base64-Bild an den Server zu senden
  submitCarData(): void {
    console.log(this.carData);
    this.http.post('http://localhost:3000/api/cars-to-sell/' + encodeURIComponent(this.carData.description) + '/' + encodeURIComponent(this.carData.price) + '/' + encodeURIComponent(this.carData.registrationDate) + '/' + encodeURIComponent(this.carData.mileage) + '/' + encodeURIComponent(this.carData.fuel) + '/' + encodeURIComponent(this.carData.color) + '/' + encodeURIComponent(this.carData.condition) + '/' + encodeURIComponent(this.carData.carsId), {}).subscribe(
      (response: any) => {
        console.log('Auto erfolgreich gespeichert:', response);
        let carToSellId = response.id;
        alert('Auto erfolgreich gespeichert!'); 
        let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        // nach alert werden bilder rein getan
        this.http.post('http://localhost:3000/api/car-images/' + encodeURIComponent(carToSellId)  , {image: this.carData.image}).subscribe(
          (response) => {
            console.log('Bild des Autos erfolgreich gespeichert:', response);
            alert('Bilde des Autos erfolgreich gespeichert!'); 
          },
          (error) => {
            console.error('Fehler beim Speichern des Bildes:', error);
            alert('Fehler beim Speichern des Bildes.');
          }
        );
      },
      (error) => {
        console.error('Fehler beim Speichern des Autos:', error);
        alert('Fehler beim Speichern des Autos.');
      }
    );
  }



}
