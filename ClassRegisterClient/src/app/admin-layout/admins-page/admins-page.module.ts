import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsPageRoutingModule } from './admins-page-routing.module';
import { AdminsListComponent } from './components/admins-list/admins-list.component';
import { PageHeaderModule } from 'src/app/shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ AdminsListComponent],
  imports: [
    CommonModule,
    AdminsPageRoutingModule,
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
export class AdminsPageModule { }
