import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CommonModule } from '@angular/common';
import { CarSearchComponent } from './car-search/car-search.component';
import { CarSellComponent } from "./car-sell/car-sell.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarListComponent, CarSearchComponent, CommonModule, CarSellComponent],
  // common module is needed for *ngIf is
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'willhaben';
  // Variable, die steuert, ob die Komponente angezeigt wird
  showCarList = false;
  showCarSearch = false;
  showCarSell = false;
  // Funktion zum Umschalten der Sichtbarkeiten
  toggleCarList() {
    this.showCarList = !this.showCarList;
  }

  toggleCarSearch() {
    this.showCarSearch = !this.showCarSearch;
  }

  toggleCarSell() {
    this.showCarSell = !this.showCarSell;
  }
}
