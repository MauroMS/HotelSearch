import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrls } from 'src/environments/environment';
import { Filter } from '../models/filter';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient: HttpClient) { }

  getAllAvailableHotels(filter: Filter): Observable<Hotel[]> {
    let url = apiUrls.getHotel;
    if (!!filter) {
      url += "?name=" + filter?.name + "&rating=" + filter.rating;

      if (!!filter.onlyAvailable) {
        url += "&onlyAvailable=" + filter.onlyAvailable
      }
    }

    return this.httpClient.get<Hotel[]>(url).pipe(
      catchError(this.handleError)
    )
  }

  getHotelById(id: number): Observable<Hotel> {
    let url = apiUrls.getHotel + id;

    return this.httpClient.get<Hotel>(url).pipe(
      catchError(this.handleError)
    )
  }

  handleError(handleError: HttpErrorResponse) {
    return throwError(handleError);
  }
}
