import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersPageRoutingModule } from './teachers-page-routing.module';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { PageHeaderModule } from 'src/app/shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TeachersListComponent],
  imports: [
    CommonModule,
    TeachersPageRoutingModule,
    PageHeaderModule,
    TableModule,
    IconsModule,
    WavesModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    InputsModule
  ]
})
export class TeachersPageModule { }
