import { StudentsListComponent } from './components/students-list/students-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'postfix'},
  {path: 'list', component: StudentsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsPageRoutingModule {}
