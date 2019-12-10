import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalEditComponent } from './modal-edit.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [ModalEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule
  ],
  exports: [ModalEditComponent]
})
export class ModalEditModule { }
