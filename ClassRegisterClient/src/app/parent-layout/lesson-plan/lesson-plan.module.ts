import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonPlanRoutingModule } from './lesson-plan-routing.module';
import { LessonPlanComponent } from './lesson-plan.component';
import { PageHeaderModule } from 'src/app/shared';


@NgModule({
  declarations: [LessonPlanComponent],
  imports: [
    CommonModule,
    LessonPlanRoutingModule,
    PageHeaderModule
  ]
})
export class LessonPlanModule { }
