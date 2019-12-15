import { GradesComponent } from './grades/grades.component';
import { SubjectsPageComponent } from './subjects-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: SubjectsPageComponent},
  {path: 'grades', component: GradesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsPageRoutingModule { }
