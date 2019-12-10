import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsPageRoutingModule } from './parents-page-routing.module';
import { ParentsListComponent } from './components/parents-list/parents-list.component';
import { PageHeaderModule } from 'src/app/shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ParentsListComponent],
  imports: [
    CommonModule,
    ParentsPageRoutingModule,
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
export class ParentsPageModule { }
