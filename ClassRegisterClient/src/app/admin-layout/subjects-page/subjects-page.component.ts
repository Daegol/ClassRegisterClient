import { SubjectToUpdate } from './../../shared/models/subjectToUpdate';
import { ModalEditComponent } from './../../shared/modules/modal-edit/modal-edit.component';
import { SubjectToCreate } from './../../shared/models/subjectToCreate';
import { AlertService } from './../../shared/services/alert.service';
import { SubjectService } from './../../shared/services/subject.service';
import { ModalAddSubjectComponent } from './../../shared/modules/modal-add-subject/modal-add-subject.component';
import { ModalAddComponent } from './../../shared/modules/modal-add/modal-add.component';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { SubjectToTable } from 'src/app/shared/models/subjectToTable';
import { first } from 'rxjs/operators';
import { Alert } from 'selenium-webdriver';
import { ModalEditSubjectComponent } from 'src/app/shared/modules/modal-edit-subject/modal-edit-subject.component';

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

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private subjectService: SubjectService,
    private alertService: AlertService
  ) { }

  headElements = ['ID', 'Nazwa', 'Prowadzący', 'Akcja'];
  masterHeadElements = ['ID', 'Nazwa Grupy', 'Liczba uczniów'];
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

}
