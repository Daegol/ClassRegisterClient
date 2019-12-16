import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonPlanComponent } from './lesson-plan.component';


const routes: Routes = [
  {path: '', component: LessonPlanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonPlanRoutingModule { }
