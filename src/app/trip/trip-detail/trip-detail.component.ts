import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from 'src/app/core/entities/route/route';
import { Shape } from 'src/app/core/entities/shape/shape';
import { ShapeService } from 'src/app/core/entities/shape/shape.service';
import { StopTime } from 'src/app/core/entities/stop-time/stop-time';
import { Stop } from 'src/app/core/entities/stop/stop';
import { Trip } from 'src/app/core/entities/trip/trip';
import { TripService } from 'src/app/core/entities/trip/trip.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html'
})
export class TripDetailComponent {
  route?: Route
  trip?: Trip
  stopTimes?: StopTime[]
  stops?: Stop[]
  shapes?: Shape[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private tripService: TripService,
    private shapeService: ShapeService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['trip_id']

      const trip = this.tripService.findOne(id).subscribe(
        res => {
          console.log(res)

          this.trip = res
          this.route = res?.route
          this.stopTimes = res?.stop_times
          this.stops = this.stopTimes!.map(item => item.stop!)

          this.shapeService.findAll(this.trip!.service_id!).subscribe(
            res => {
              this.shapes = res
            }
          )
        }
      )
    });
  }
}
