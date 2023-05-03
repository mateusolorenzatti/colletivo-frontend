import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { StopTimeDraft } from 'src/app/core/entities/stop-time/stop-time-draft';
import { Stop } from 'src/app/core/entities/stop/stop';
import { StopService } from 'src/app/core/entities/stop/stop.service';
import { MapService } from 'src/app/core/map/map.service';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html'
})
export class CreateRouteComponent implements OnInit {
  private stops!: Stop[]

  stopTimeDraftList: StopTimeDraft[] = []

  @ViewChild('map') map: MapComponent

  constructor(
    private stopService: StopService,
    private mapService: MapService
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
            callbackFunc: (clickedStopId: string) => {
              // Cannot select a stop twice
              if(
                this.stopTimeDraftList.length > 0 &&
                this.stopTimeDraftList.filter(stop => stop.stop?.id == clickedStopId).length > 0
              ){
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
              if(position > 1){
                this.map.addDirections(
                  // pointA
                  [ 
                    this.stopTimeDraftList[ position - 2 ].stop?.stop_lon as number,
                    this.stopTimeDraftList[ position - 2 ].stop?.stop_lat as number 
                  ],
                  // pointB
                  [ 
                    this.stopTimeDraftList[ position - 1 ].stop?.stop_lon as number, 
                    this.stopTimeDraftList[ position - 1 ].stop?.stop_lat as number
                  ],
                  this.mapService
                )
              }

            }
          }
          )
        )
      },
      error => console.log(error)
    )
  }

  onStopTimeDraftRemoved(stopTimeDraft: StopTimeDraft) {
    const resultRecreateDirections = this.map.recreateDirections(
      stopTimeDraft, 
      (
        stopTimeDraft.stop?.id == this.stopTimeDraftList[0].stop?.id 
        || 
        stopTimeDraft.stop?.id == this.stopTimeDraftList[this.stopTimeDraftList.length - 1].stop?.id
      )
    )

    if(!resultRecreateDirections.isEdgePoint){
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
}
