import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSellComponent } from './car-sell.component';

describe('CarSellComponent', () => {
  let component: CarSellComponent;
  let fixture: ComponentFixture<CarSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
