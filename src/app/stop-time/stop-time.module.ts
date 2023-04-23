import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopTimeItemCreateComponent } from './stop-time-item-create/stop-time-item-create.component';



@NgModule({
  declarations: [
    StopTimeItemCreateComponent
  ],
  exports:[
    StopTimeItemCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StopTimeModule { }
