import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'co-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input('text') text: string = 'No text'
  @Input('type') type: string = 'normal'

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
