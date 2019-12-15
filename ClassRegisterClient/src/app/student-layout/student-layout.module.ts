import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentLayoutRoutingModule } from './student-layout-routing.module';
import { StudentLayoutComponent } from './student-layout.component';


@NgModule({
  declarations: [StudentLayoutComponent],
  imports: [
    CommonModule,
    StudentLayoutRoutingModule
  ]
})
export class StudentLayoutModule { }
