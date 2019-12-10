import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { StudentService, AlertService } from 'src/app/shared';
import { GroupsTable } from 'src/app/shared/models/groupsTable';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
  animations: [routerTransition()]
})
export class GroupsPageComponent {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: GroupsTable[] = [];
  headElements = ['Id', 'Nazwa', 'Wychowawca', 'Akcja'];
  tableNames = ['id', 'name', 'tutor'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private studentService: StudentService,
    private alertService: AlertService) { }

    addRow()
    {

    }

    editRow(el: any)
    {

    }

    removeRow(el: any)
    {

    }
}
