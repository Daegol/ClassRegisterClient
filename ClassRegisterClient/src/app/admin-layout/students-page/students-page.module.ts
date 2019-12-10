
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsPageRoutingModule } from './students-page-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StudentsListComponent],
  imports: [
    CommonModule,
    StudentsPageRoutingModule,
    PageHeaderModule,
    TableModule,
    IconsModule,
    WavesModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    InputsModule
  ],
})
export class StudentsPageModule { }
