import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailViewComponent } from './car-detail-view.component';

describe('CarDetailViewComponent', () => {
  let component: CarDetailViewComponent;
  let fixture: ComponentFixture<CarDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
