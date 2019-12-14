import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsPageRoutingModule } from './groups-page-routing.module';
import { GroupsPageComponent } from './groups-page.component';
import { PageHeaderModule } from './../../shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGroupComponent } from './add-group/add-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { LessonPlanComponent } from './lesson-plan/lesson-plan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddLessonPlanComponent } from './add-lesson-plan/add-lesson-plan.component';


@NgModule({
  declarations: [GroupsPageComponent, AddGroupComponent, EditGroupComponent, LessonPlanComponent, AddLessonPlanComponent],
  imports: [
    CommonModule,
    GroupsPageRoutingModule,
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
export class GroupsPageModule { }
