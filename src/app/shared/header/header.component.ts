import { Component, Input } from '@angular/core';

@Component({
  selector: 'co-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input('text') text: string = 'No text'
  @Input('type') type: string = 'normal'
}
