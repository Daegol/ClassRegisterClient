import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';


const routes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'groups-page', loadChildren: () => import('./groups-page/groups-page.module').then(m => m.GroupsPageModule) },
    { path: 'students-page', loadChildren: () => import('./students-page/students-page.module').then(m => m.StudentsPageModule) },
    { path: 'subjects-page', loadChildren: () => import('./subjects-page/subjects-page.module').then(m => m.SubjectsPageModule) },
    { path: 'teachers-page', loadChildren: () => import('./teachers-page/teachers-page.module').then(m => m.TeachersPageModule) },
    { path: 'admins-page', loadChildren: () => import('./admins-page/admins-page.module').then(m => m.AdminsPageModule) },
    { path: 'parents-page', loadChildren: () => import('./parents-page/parents-page.module').then(m => m.ParentsPageModule) },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
