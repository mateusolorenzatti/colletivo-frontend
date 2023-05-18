import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { StopTime } from 'src/app/core/entities/stop-time/stop-time';
import { StopTimeDraft } from 'src/app/core/entities/stop-time/stop-time-draft';

@Component({
  selector: 'co-stop-time-item',
  templateUrl: './stop-time-item.component.html'
})
export class StopTimeItemComponent {
  @Input('stopTimeDraft') stopTimeDraft?: StopTimeDraft
  @Input('stopTime') stopTime?: StopTime
  @Input('editable') editable: Boolean = false

  @ViewChild('timeImput', {static: false}) timeInput!: ElementRef

  @Output() removed = new EventEmitter<StopTimeDraft>()
  
  remove() {
    this.removed.emit(this.stopTimeDraft);
  }

  getStopTime(): StopTimeDraft{
    return this.stopTimeDraft!
  }

  getTime(){
    return this.timeInput.nativeElement.value ? this.timeInput.nativeElement.value : '15:00'
  }
}
