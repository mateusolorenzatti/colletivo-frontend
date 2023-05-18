import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopTimeItemComponent } from './stop-time-item/stop-time-item.component';

@NgModule({
  declarations: [
    StopTimeItemComponent
  ],
  exports:[
    StopTimeItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StopTimeModule { }
