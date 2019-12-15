import { GroupAssignedToSubject } from './../../shared/models/groupAssignedToSubject';
import { GradesService } from './../../shared/services/grades.service';
import { Router } from '@angular/router';
import { SubjectToUpdate } from './../../shared/models/subjectToUpdate';
import { SubjectToCreate } from './../../shared/models/subjectToCreate';
import { AlertService } from './../../shared/services/alert.service';
import { SubjectService } from './../../shared/services/subject.service';
import { ModalAddSubjectComponent } from './../../shared/modules/modal-add-subject/modal-add-subject.component';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { SubjectToTable } from 'src/app/shared/models/subjectToTable';
import { first } from 'rxjs/operators';
import { ModalEditSubjectComponent } from 'src/app/shared/modules/modal-edit-subject/modal-edit-subject.component';
import { SubjectToGrades } from 'src/app/shared/models/subjectToGrades';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  searchText = '';
  previous = '';
  modalRef: MDBModalRef;
  subjectToGrade: SubjectToGrades;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private gradesService: GradesService,
    private router: Router
  ) { }

  headElements = ['ID', 'Nazwa', 'Prowadzący', 'Akcja'];
  masterHeadElements = ['ID', 'Nazwa Grupy', 'Liczba uczniów', 'Oceny'];
  tableNames = ['id', 'name', 'teacherName'];
  elements: SubjectToTable[] = [];


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

  ngOnInit() {
    this.gradesService.currentEditedClassId.subscribe(message => this.subjectToGrade = message);
    this.getAllSubjects();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(6);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addRow() {
    this.modalRef = this.modalService.show(ModalAddSubjectComponent);
    this.modalRef.content.saveButtonClicked.subscribe(
      (newElement: SubjectToCreate) => {
        this.subjectService.addSubject(newElement).pipe(first()).subscribe(
          result => {
            this.alertService.success('Dodano przedmiot', true);
            this.getAllSubjects();
          },
          error => {
            this.alertService.error(error);
          }
        );
      });
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().pipe(first()).subscribe(
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

  editRow(el: any) {
    const modalOptions = {
      data: {
        editedRow: el
      }
    };
    this.modalRef = this.modalService.show(ModalEditSubjectComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe(
      (newElement: SubjectToUpdate) => {
        this.subjectService.editSubject(newElement).subscribe(
          result => {
            this.alertService.success("Przedmiot został edytowany");
            this.getAllSubjects();
          },
          error => {
            this.alertService.error(error);
          });
      });
  }

  removeRow(el: any) {
    this.subjectService.removeSubject(el.databaseId).pipe(first()).subscribe(
      result => {
        this.alertService.success("Przedmiot został usunięty");
        this.getAllSubjects();
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  grades(el: SubjectToTable, group: GroupAssignedToSubject) {
    const gradesData: SubjectToGrades = {
      subjectId: el.databaseId, teacherPesel: el.teacherPesel,
      groupId: Guid.parse(group.id.toString()), subjectName: el.name, teacherName: el.teacherName
    };
    this.gradesService.changeEditedClassId(gradesData);
    this.router.navigate(['admin/subjects-page/grades']);
  }

}
