import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingComponent],
      imports: [
        MatIconModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all ratings text', () => {
    component.stars = 0;
    fixture.detectChanges();

    const label = fixture.debugElement.nativeElement.querySelector('#allRatingsText');
    expect(label.innerHTML).toBe('All Ratings');
  });

  it('should display 5 start rating', () => {
    component.stars = 5;
    fixture.detectChanges();
    const icons = fixture.debugElement.nativeElement.querySelectorAll('#starsIcon');
    expect(icons.length).toBe(5);
  });
});
