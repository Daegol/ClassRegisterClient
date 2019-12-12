import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsPageComponent } from './groups-page.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';


const routes: Routes = [
  {
    path: '',
    component: GroupsPageComponent
  },
  {
    path: 'add',
    component: AddGroupComponent
  },
  {
    path: 'edit',
    component: EditGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsPageRoutingModule { }
