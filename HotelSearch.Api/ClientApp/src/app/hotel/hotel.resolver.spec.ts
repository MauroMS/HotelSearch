import { TestBed } from '@angular/core/testing';

import { HotelResolver } from './hotel.resolver';

describe('HotelResolver', () => {
  let resolver: HotelResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HotelResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
