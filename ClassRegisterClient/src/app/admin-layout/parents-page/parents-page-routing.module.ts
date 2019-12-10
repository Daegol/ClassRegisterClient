import { ParentsListComponent } from './components/parents-list/parents-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'postfix'},
  {path: 'list', component: ParentsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsPageRoutingModule { }
