import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsPageRoutingModule } from './subjects-page-routing.module';
import { SubjectsPageComponent } from './subjects-page.component';
import { PageHeaderModule } from 'src/app/shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SubjectsPageComponent],
  imports: [
    CommonModule,
    SubjectsPageRoutingModule,
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
export class SubjectsPageModule { }
