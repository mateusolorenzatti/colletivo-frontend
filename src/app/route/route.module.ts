import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteRoutingModule } from './route-routing.module';
import { MapModule } from '../shared/map/map.module';
import { CreateRouteComponent } from './create-route/create-route.component';
import { MapComponent } from '../shared/map/map.component';

@NgModule({
  declarations: [
    CreateRouteComponent
  ],
  imports: [
    CommonModule,
    RouteRoutingModule,
    MapModule
  ]
})
export class RouteModule { }
