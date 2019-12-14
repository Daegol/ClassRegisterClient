import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { StudentService, AlertService, GroupService } from 'src/app/shared';
import { GroupsTable } from 'src/app/shared/models/groupsTable';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
  animations: [routerTransition()]
})
export class GroupsPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: GroupsTable[] = [];
  headElements = ['Id', 'Nazwa', 'Wychowawca', 'Liczba uczniów', 'Akcja'];
  tableNames = ['id', 'name', 'tutor', 'studentsNumber'];
  searchText = '';
  previous: string;
  currentEditedClass: GroupsTable;


  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private groupService: GroupService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.groupService.currentEditedClassId.subscribe(message => this.currentEditedClass = message);
    this.getAllClasses();
  }
  @HostListener('input') oninput() { this.searchItems(); }

  searchItems() {
    const prev =
      this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); this.elements =
        this.mdbTable.getDataSource();

    }
    if (this.searchText) {
      this.elements =
        this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  editRow(el: any) {
    this.groupService.changeEditedClassId(el);
    this.router.navigate(['groups-page/edit']);
  }

  openPlan(el: any) {
    this.groupService.changeEditedClassId(el);
    this.router.navigate(["groups-page/plan"]);
  }

  removeRow(el: any) {
    this.groupService.removeGroup(el.databaseId).pipe(first()).subscribe(
      result => {
        this.alertService.success("Klasa została usunięta");
        this.getAllClasses();
      },
      error => this.alertService.error(error)
    )
  }
  addIndex(i: any) {
    this.elements[i].id = i + 1;
    return i + 1;
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(6);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getAllClasses() {
    this.groupService.getAllGroups().pipe(first()).subscribe(
      result => {
        this.elements = result;
        for (let i = 0; i < this.elements.length; i++) {
          this.elements[i].id = i + 1;
        }
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();
      },
      error => {
        this.alertService.error(error);
      }
    );
  }
}
