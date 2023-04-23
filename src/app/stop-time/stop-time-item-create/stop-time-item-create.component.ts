import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StopTimeDraft } from 'src/app/core/entities/stop-time/stop-time-draft';

@Component({
  selector: 'co-stop-time-item-create',
  templateUrl: './stop-time-item-create.component.html'
})
export class StopTimeItemCreateComponent {
  @Input('stopTimeDraft') stopTimeDraft?: StopTimeDraft

  @Output() removed = new EventEmitter<StopTimeDraft>()
  
  remove() {
    this.removed.emit(this.stopTimeDraft);
  }
}
