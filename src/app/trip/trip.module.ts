import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripRoutingModule } from './trip-routing.module';
import { HeaderModule } from '../shared/header/header.module';
import { MapModule } from '../shared/map/map.module';
import { StopTimeModule } from '../stop-time/stop-time.module';

@NgModule({
  declarations: [
    TripDetailComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    HeaderModule,
    MapModule,
    StopTimeModule
  ]
})
export class TripModule { }
