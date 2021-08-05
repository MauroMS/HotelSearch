import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Hotel } from '../models/hotel';
import { debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { HotelService } from '../services/hotel.service';
import { Filter } from '../models/filter';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-search',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit, OnDestroy {
  sub: Subscription;
  hotels = new MatTableDataSource<Hotel>();
  displayedColumns = ['name', 'description', 'location', 'rating'];
  filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  starOptions = [0, 1, 2, 3, 4, 5];

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.sub = new Subscription;

    this.createFilterForm();
    this.createValueChangesWatcher();

    this.filterForm.controls['name'].setValue('');
  }

  ngAfterViewInit() {
    this.hotels.paginator = this.paginator;
    this.hotels.sort = this.sort;
  }

  createFilterForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(),
      rating: new FormControl(0)
    });
  }

  createValueChangesWatcher() {
    this.sub.add(this.filterForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((val) => this.getHotels({ name: val.name, rating: val.rating, onlyAvailable: true }))
      ).subscribe({
        next: res => this.hotels.data = res,
        error: err => console.log("Error:", err.message)
      })
    );
  }

  getHotels(filter: Filter): Observable<Hotel[]> {
    return this.hotelService.getAllAvailableHotels(filter).pipe(
      take(1)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
