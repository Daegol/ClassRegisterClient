import { ParentLayoutComponent } from './parent-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: ParentLayoutComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'lessonplan', loadChildren: () => import('./lesson-plan/lesson-plan.module').then(m => m.LessonPlanModule) },
    { path: 'grades', loadChildren: () => import('./grades/grades.module').then(m => m.GradesModule) }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentLayoutRoutingModule { }
