import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hotel } from '../models/hotel';
import { HotelService } from '../services/hotel.service';

@Injectable({
  providedIn: 'root'
})
export class HotelResolver implements Resolve<Hotel> {

  constructor(private hotelService: HotelService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hotel> {
    const id = +route.paramMap.get('id');
    if (id === 0) {
      return of({
        description: '',
        id: 0,
        isAvailable: 0,
        location: '',
        name: '',
        rating: 1
      });
    }

    return this.hotelService.getHotelById(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/hotel');
        return EMPTY;
      })
    );
  }
}
