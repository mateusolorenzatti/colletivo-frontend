import { Component } from '@angular/core';
import { Trip } from 'src/app/core/entities/trip/trip';
import { TripService } from 'src/app/core/entities/trip/trip.service';

@Component({
  selector: 'co-trip-list',
  templateUrl: './trip-list.component.html'
})
export class TripListComponent {
  trips!: Trip[]

  constructor(
    private tripService: TripService,
  ){ }

  ngOnInit(): void {
    this.tripService.findAll().subscribe(
      trips => this.trips = trips
    )
  }
}
