import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { StopTimeDraft } from 'src/app/core/entities/stop-time/stop-time-draft';

@Component({
  selector: 'co-stop-time-item-create',
  templateUrl: './stop-time-item-create.component.html'
})
export class StopTimeItemCreateComponent {
  @Input('stopTimeDraft') stopTimeDraft!: StopTimeDraft

  @ViewChild('timeImput', {static: false}) timeInput!: ElementRef

  @Output() removed = new EventEmitter<StopTimeDraft>()
  
  remove() {
    this.removed.emit(this.stopTimeDraft);
  }

  getStopTime(): StopTimeDraft{
    return this.stopTimeDraft
  }

  getTime(){
    return this.timeInput.nativeElement.value ? this.timeInput.nativeElement.value : '15:00'
  }
}
