import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'postfix'},
  {path: 'list', component: TeachersListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersPageRoutingModule { }
