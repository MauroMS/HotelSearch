import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HotelService } from '../services/hotel.service';

import { HotelResolver } from './hotel.resolver';

describe('HotelResolver', () => {
  let resolver: HotelResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotelService],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    });
    resolver = TestBed.inject(HotelResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
