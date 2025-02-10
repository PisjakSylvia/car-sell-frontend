import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarFilterService {
  private filterData = new BehaviorSubject<any>({
    brand: '',
    model: '',
    type: '',
    description: '',
    price: '',
    registrationDate: '',
    mileage: 0,
  });

  filterData$ = this.filterData.asObservable();

  setFilterData(data: any) {
    this.filterData.next(data);
  }

  getFilterData() {
    return this.filterData.getValue();
  }
}
