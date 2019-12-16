import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentLayoutRoutingModule } from './parent-layout-routing.module';
import { ParentLayoutComponent } from './parent-layout.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from '../shared';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [ParentLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    ParentLayoutRoutingModule,
    NgbDropdownModule,
    AlertModule,
  ]
})
export class ParentLayoutModule { }
