import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Filter } from '../models/filter';
import { RatingComponent } from '../rating/rating.component';
import { HotelService } from '../services/hotel.service';
import { HotelComponent } from './hotel.component';

describe('HotelComponent', () => {
  let component: HotelComponent;
  let mockHotelService;
  let filter: Filter;
  let fixture: ComponentFixture<HotelComponent>;
  let availableHotels = [
    {
      "id": 2,
      "name": "Amet Consectetuer Adipiscing PC",
      "description": "Sed nunc",
      "rating": 5,
      "location": "United States",
      "isAvailable": 1
    },
    {
      "id": 3,
      "name": "Mauris Consulting",
      "description": "posuere, enim",
      "rating": 2,
      "location": "Saint Pierre and Miquelon",
      "isAvailable": 1
    },
    {
      "id": 7,
      "name": "Posuere Cubilia Foundation",
      "description": "felis eget",
      "rating": 5,
      "location": "Guernsey",
      "isAvailable": 1
    },
    {
      "id": 9,
      "name": "Eu Associates",
      "description": "tellus justo",
      "rating": 4,
      "location": "French Guiana",
      "isAvailable": 1
    },
    {
      "id": 11,
      "name": "Lectus Inc.",
      "description": "sed, est.",
      "rating": 4,
      "location": "Belize",
      "isAvailable": 1
    },
    {
      "id": 14,
      "name": "Ut Industries",
      "description": "neque pellentesque",
      "rating": 5,
      "location": "Venezuela",
      "isAvailable": 1
    },
    {
      "id": 15,
      "name": "Lobortis Tellus Justo PC",
      "description": "ultrices. Vivamus rhoncus.",
      "rating": 4,
      "location": "Mauritania",
      "isAvailable": 1
    },
    {
      "id": 16,
      "name": "Nulla Vulputate Corp.",
      "description": "semper tellus id",
      "rating": 4,
      "location": "Namibia",
      "isAvailable": 1
    },
    {
      "id": 17,
      "name": "Nunc Sed PC",
      "description": "magnis dis parturient",
      "rating": 1,
      "location": "Aruba",
      "isAvailable": 1
    },
    {
      "id": 18,
      "name": "Id Erat Etiam Corp.",
      "description": "Mauris vel turpis. Aliquam",
      "rating": 4,
      "location": "Paraguay",
      "isAvailable": 1
    },
    {
      "id": 20,
      "name": "Suspendisse Non Leo Corporation",
      "description": "est. Nunc laoreet",
      "rating": 1,
      "location": "Slovenia",
      "isAvailable": 1
    }
  ];

  beforeEach(() => {
    mockHotelService = jasmine.createSpyObj(['getAllAvailableHotels', 'handleError']);
    mockHotelService.getAllAvailableHotels.and.returnValue(of(availableHotels));
    component = new HotelComponent(mockHotelService);
  });

  describe('Get All Hotels', () => {

    it('Should call getAllAvailableHotels once', () => {
      component.getHotels(null);
      expect(mockHotelService.getAllAvailableHotels).toHaveBeenCalledTimes(1);
    });

    it('Should retrieve all hotels from the db', () => {
      component.getHotels(null).subscribe(result => {
        expect(result.length).toBe(11);
      })
    });

    it('Should call getAllAvailableHotels with filter', () => {
      filter = {
        name: 'con',
        onlyAvailable: true,
        rating: 5
      };

      component.getHotels(filter);
      expect(mockHotelService.getAllAvailableHotels).toHaveBeenCalledWith(filter);
    });

  });

  describe('TestBed tests', () => {
    beforeEach(async () => {
      await TestBed
        .configureTestingModule({
          declarations: [HotelComponent, RatingComponent],
          providers: [
            { provide: HotelService, useValue: mockHotelService },
          ],
          imports: [
            ReactiveFormsModule,
            FormsModule,
            MatTableModule,
            MatPaginatorModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatIconModule,
            ReactiveFormsModule,
            MatSortModule,
            BrowserAnimationsModule]
        })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HotelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Should call getAllAvailableHotels once when changing filter', (done: DoneFn) => {
      spyOn(component, 'getHotels').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.getHotels).toHaveBeenCalledTimes(1);
        expect(component.hotels.data.length).toBeGreaterThan(5);
        done();
      });
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

});
