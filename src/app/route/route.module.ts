import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteRoutingModule } from './route-routing.module';
import { MapModule } from '../shared/map/map.module';
import { CreateRouteComponent } from './create-route/create-route.component';
import { MapComponent } from '../shared/map/map.component';
import { HeaderComponent } from '../shared/header/header.component';
import { HeaderModule } from '../shared/header/header.module';
import { StopTimeModule } from '../stop-time/stop-time.module';
import { RouteFormComponent } from './create-route/route-form/route-form.component';
import { MapService } from '../core/map/map.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateRouteComponent,
    RouteFormComponent
  ],
  imports: [
    CommonModule,
    RouteRoutingModule,
    ReactiveFormsModule,
    MapModule,
    HeaderModule,
    StopTimeModule
  ]
})
export class RouteModule { }
