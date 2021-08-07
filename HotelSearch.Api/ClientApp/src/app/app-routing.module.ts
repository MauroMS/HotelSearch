import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelDetailsComponent } from './hotel/hotel-details/hotel-details.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelResolver } from './hotel/hotel.resolver';

const routes: Routes = [
  {
    path: 'hotel/:id',
    component: HotelDetailsComponent,
    resolve: {
      hotel: HotelResolver
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/hotel'
  },
  {
    path: 'hotel',
    component: HotelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
