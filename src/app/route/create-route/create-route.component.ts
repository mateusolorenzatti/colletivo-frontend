import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StopTimeDraft } from 'src/app/core/entities/stop-time/stop-time-draft';
import { Stop } from 'src/app/core/entities/stop/stop';
import { StopService } from 'src/app/core/entities/stop/stop.service';
import { MapService } from 'src/app/core/map/map.service';
import { MapComponent } from 'src/app/shared/map/map.component';
import { RouteFormComponent } from './route-form/route-form.component';
import { RouteService } from 'src/app/core/entities/route/route.service';
import { TripCreate } from 'src/app/core/entities/trip/trip-create';
import { TripService } from 'src/app/core/entities/trip/trip.service';
import { Shape } from 'src/app/core/entities/shape/shape';
import { ShapeService } from 'src/app/core/entities/shape/shape.service';
import { Observable, forkJoin } from 'rxjs';
import { StopTime } from 'src/app/core/entities/stop-time/stop-time';
import { StopTimeCreate } from 'src/app/core/entities/stop-time/stop-time-create';
import { StopTimeService } from 'src/app/core/entities/stop-time/stop-time.service';
import { StopTimeItemComponent } from 'src/app/stop-time/stop-time-item/stop-time-item.component';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html'
})
export class CreateRouteComponent implements OnInit {
  private stops!: Stop[]

  stopTimeDraftList: StopTimeDraft[] = []

  @ViewChild('map') map: MapComponent
  @ViewChild('form') form!: RouteFormComponent

  @ViewChildren(StopTimeItemComponent) stopTimeComponents!: QueryList<StopTimeItemComponent>

  constructor(
    private stopService: StopService,
    private mapService: MapService,
    private routeService: RouteService,
    private tripService: TripService,
    private shapeService: ShapeService,
    private stopTimeService: StopTimeService,
  ) {
    this.map = new MapComponent()
  }

  ngOnInit() {
    this.stopService.findAll().subscribe(
      data => {
        this.stops = data

        console.log(this.stops)

        this.stops.forEach(
          stop => this.map.addPoint({
            id: stop.id,
            coordinates: [stop.stop_lon, stop.stop_lat],
            popupInfo: {
              code: stop.stop_code,
              description: stop.stop_name + ''
            },
            callbackFunc: (clickedStopId: string) => this.onStopAdded(clickedStopId)
          })
        )
      },
      error => console.log(error)
    )
  }

  onStopAdded(clickedStopId: string) {
    // Cannot select a stop twice
    if (
      this.stopTimeDraftList.length > 0 &&
      this.stopTimeDraftList.filter(stop => stop.stop?.id == clickedStopId).length > 0
    ) {
      return
    }

    this.stopTimeDraftList.push({
      // arrival_time
      stop_sequence: this.stopTimeDraftList.length + 1,
      stop: this.stops.find(stop => stop.id == clickedStopId)
    })

    console.log(this.stopTimeDraftList)

    let position = this.stopTimeDraftList.length

    // Generates the route from the previous point
    if (position > 1) {
      this.map.addDirections(
        // pointA
        [
          this.stopTimeDraftList[position - 2].stop?.stop_lon as number,
          this.stopTimeDraftList[position - 2].stop?.stop_lat as number
        ],
        // pointB
        [
          this.stopTimeDraftList[position - 1].stop?.stop_lon as number,
          this.stopTimeDraftList[position - 1].stop?.stop_lat as number
        ],
        this.mapService
      )
    }
  }

  onStopRemoved(stopTimeDraft: StopTimeDraft) {
    const resultRecreateDirections = this.map.recreateDirections(
      stopTimeDraft,
      (
        stopTimeDraft.stop?.id == this.stopTimeDraftList[0].stop?.id
        ||
        stopTimeDraft.stop?.id == this.stopTimeDraftList[this.stopTimeDraftList.length - 1].stop?.id
      )
    )

    if (!resultRecreateDirections.isEdgePoint) {
      this.map.addDirections(
        resultRecreateDirections.pointA,
        resultRecreateDirections.pointB,
        this.mapService
      )
    }

    this.stopTimeDraftList = this.stopTimeDraftList.filter(
      stopTimeDraftTemp =>
        !(stopTimeDraftTemp.stop?.id == stopTimeDraft.stop?.id
          &&
          stopTimeDraftTemp.stop_sequence == stopTimeDraft.stop_sequence)
    )

    this.stopTimeDraftList = this.stopTimeDraftList.map(
      stopTime => {
        stopTime.stop_sequence = this.stopTimeDraftList.indexOf(stopTime) + 1
        return stopTime
      }
    )
  }

  onSubmit() {
    // Define data
    const route = this.form.submitRouteData()
    const serviceId = this.form.getServiceId()

    // Get each stop-time arrival time from the component
    this.stopTimeComponents.forEach(stopTimeComponent => {
      this.stopTimeDraftList.forEach(stopTimeDraft => {
        if(stopTimeDraft.stop?.id == stopTimeComponent.getStopTime().stop?.id){
          stopTimeDraft.arrival_time = stopTimeComponent.getTime() + ':00'
        }
      })
    })
    
    // console.log(this.map.getDirectionsDetail())
    const shapes: Array<Shape> = []

    // Create Route
    this.routeService.create(route).subscribe(
      resRoute => {
        console.log(resRoute)

        // Create Trip
        const trip = {
          route: resRoute.id,
          trip_short_name: route.short_name,
          service_id: serviceId
        } satisfies TripCreate
        this.tripService.create(trip).subscribe(
          resTrip => {
            console.log(resTrip)

            // Create Shapes
            this.map.getDirectionsDetail().forEach((coordinate, index) => {
              shapes.push(
                {
                  trip: resTrip.id,
                  shape_id: serviceId,
                  pt_sequence: index + 1,
                  pt_lat: coordinate[1] as unknown as string,
                  pt_lon: coordinate[0] as unknown as string
                } satisfies Shape
              )
            })

            const shapesRequestList: Observable<Shape>[] = []

            shapes.forEach(shape => shapesRequestList.push(this.shapeService.create(shape)))

            forkJoin(...shapesRequestList).subscribe(resShapes => {
              console.log(resShapes)

              // Create StopTimes
              const stopTimes: Array<StopTimeCreate> = this.stopTimeDraftList.map((stopTime) => {
                return {
                  // ToDo -> Access the real arrival time data
                  arrival_time: stopTime.arrival_time,
                  stop_sequence: stopTime.stop_sequence,
                  stop: stopTime.stop?.id,
                  trip: resTrip.id
                } satisfies StopTimeCreate
              })

              const stopTimeRequestList: Observable<StopTime>[] = []

              stopTimes.forEach(stopTime => stopTimeRequestList.push(this.stopTimeService.create(stopTime)))

              forkJoin(...stopTimeRequestList).subscribe(stopTimes => console.log(stopTimes))
            })
          }
        )
      }
    )
  }
}
