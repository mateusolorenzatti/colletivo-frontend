import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripRoutingModule } from './trip-routing.module';
import { HeaderModule } from '../shared/header/header.module';

@NgModule({
  declarations: [
    TripDetailComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    HeaderModule
  ]
})
export class TripModule { }
