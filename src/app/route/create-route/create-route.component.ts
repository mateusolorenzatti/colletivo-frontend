import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { StopTimeDraft } from 'src/app/core/entities/stop-time/stop-time-draft';
import { Stop } from 'src/app/core/entities/stop/stop';
import { StopService } from 'src/app/core/entities/stop/stop.service';
import { MapComponent } from 'src/app/shared/map/map.component';
import { StopTimeModule } from 'src/app/stop-time/stop-time.module';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html'
})
export class CreateRouteComponent implements OnInit {
  private stops?: Stop[]

  stopTimeDraftList: StopTimeDraft[] = []

  @ViewChild('map') map: MapComponent

  constructor(
    private stopService: StopService
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
              this.stopTimeDraftList.push({
                // arrival_time
                stop_sequence: this.stopTimeDraftList.length + 1,
                stop: this.stops?.find(stop => stop.id == clickedStopId)
              })

              console.log(this.stopTimeDraftList)
            }
          }
          )
        )
      },
      error => console.log(error)
    )
  }

  onStopTimeDraftRemoved(stopTimeDraft: StopTimeDraft) {
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
