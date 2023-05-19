import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/app/core/entities/trip/trip';

@Component({
  selector: 'co-trip-list-item',
  templateUrl: './trip-list-item.component.html'
})
export class TripListItemComponent {
  @Input('trip') trip!: Trip

  constructor(
    private router: Router
  ){ }
}
