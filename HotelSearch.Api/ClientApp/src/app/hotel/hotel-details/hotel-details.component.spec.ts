import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { HotelDetailsComponent } from './hotel-details.component';

describe('HotelDetailsComponent', () => {
  let component: HotelDetailsComponent;
  let fixture: ComponentFixture<HotelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelDetailsComponent],
      imports: [
        RouterModule.forRoot([]),
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HotelDetailsComponent);
    fixture.componentInstance.hotel =
    {
      id: 0,
      description: '',
      isAvailable: 0,
      location: '',
      name: '',
      rating: 0
    };
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
