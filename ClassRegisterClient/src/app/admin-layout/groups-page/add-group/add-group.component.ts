import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { StudentService, AlertService } from 'src/app/shared';
import { StudentsInGroup } from 'src/app/shared/models/studentsInGroup';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  studentElements: StudentsInGroup[] = [];
  studentHeadElements = ['Wybierz', 'Imię', 'Nazwisko', 'Pesel'];
  studentTableNames = ['isChecked', 'firstName', 'lastName', 'pesel'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private studentService: StudentService,
    private alertService: AlertService) { }

  ngOnInit() {
    const s: StudentsInGroup = { isChecked: false, FirstName: 'Imie', LastName: 'Nazwisko', Pesel: 'Pesel'};
    this.studentElements.push(s);
  }

  //@HostListener('input') oninput() { this.searchItems(); }

  /*searchItems() {
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
  }*/

}
