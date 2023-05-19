import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripRoutingModule } from './trip-routing.module';
import { HeaderModule } from '../shared/header/header.module';
import { MapModule } from '../shared/map/map.module';
import { StopTimeModule } from '../stop-time/stop-time.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripListItemComponent } from './trip-list/trip-list-item/trip-list-item.component';

@NgModule({
  declarations: [
    TripDetailComponent,
    TripListComponent,
    TripListItemComponent
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
