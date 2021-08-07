import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HotelService } from './hotel.service';
import { apiUrls } from 'src/environments/environment';
import { Filter } from '../models/filter';
import { Hotel } from '../models/hotel';

describe('HotelService', () => {
  let availableHotels: Hotel[] = [
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
  let httpTestingController: HttpTestingController;
  let hotelService: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotelService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    hotelService = TestBed.inject(HotelService);
  });

  describe('Get All Hotels', () => {

    it('should call get with correct url', () => {
      let filter: Filter = { name: '', onlyAvailable: true, rating: 0 };
      let url = apiUrls.getHotel + "?name=" + filter?.name + "&rating=" + filter.rating + "&onlyAvailable=" + filter.onlyAvailable;

      hotelService.getAllAvailableHotels(filter).subscribe();

      const request = httpTestingController.expectOne(url);
      request.flush(availableHotels);

      httpTestingController.verify();
    });

    it('should return value  from the get call', () => {
      let filter: Filter = { name: '', onlyAvailable: true, rating: 0 };
      let url = apiUrls.getHotel + "?name=" + filter?.name + "&rating=" + filter.rating + "&onlyAvailable=" + filter.onlyAvailable;

      hotelService.getAllAvailableHotels(filter).subscribe(response => {
        expect(response.length).toBeGreaterThan(0);
      });

      const request = httpTestingController.expectOne(url);
      request.flush(availableHotels);
      httpTestingController.verify();
    });
  });

});
