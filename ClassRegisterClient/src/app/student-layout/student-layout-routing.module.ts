import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentLayoutComponent } from './student-layout.component';


const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentLayoutRoutingModule { }
