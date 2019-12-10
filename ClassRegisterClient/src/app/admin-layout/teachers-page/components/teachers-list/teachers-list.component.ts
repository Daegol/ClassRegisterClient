import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UserTable } from 'src/app/shared/models/userTable';
import { TeacherService, AlertService } from 'src/app/shared';
import { ModalEditComponent } from 'src/app/shared/modules/modal-edit/modal-edit.component';
import { Teacher } from 'src/app/shared/models/teacher';
import { first } from 'rxjs/operators';
import { ModalAddComponent } from 'src/app/shared/modules/modal-add/modal-add.component';
import { UserRegistrationDto } from 'src/app/shared/models/userRegistrationDto';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: UserTable[] = [];
  headElements = ['Id', 'Imię', 'Nazwisko', 'Email', 'Pesel', 'Numer telefonu', 'Adres', 'Akcja'];
  tableNames = ['id', 'firstName', 'lastName', 'email', 'pesel', 'phoneNumber', 'address'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private teacherService: TeacherService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getteachers();
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


  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(6);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(ModalEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: Teacher) => {
      this.teacherService.update(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dane użytkownika zostały zaaktualizowane');
          this.getteachers();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
    this.mdbTable.setDataSource(this.elements);
  }

  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.teacherService.delete(this.elements[elementIndex].pesel).pipe(first()).subscribe(
      success => {
        this.alertService.success('Użytkownik został usunięty');
        this.getteachers();
      },
      error => {
        this.alertService.error(error.message);
      }

    );
    this.mdbTable.setDataSource(this.elements);
  }

  addRow() {
    this.modalRef = this.modalService.show(ModalAddComponent);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: UserRegistrationDto) => {
      newElement.Role = 'Teacher';
      this.teacherService.register(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dodano nowego użytkownika');
          this.getteachers();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
  }

  getteachers() {
    this.teacherService.getAll().pipe(first()).subscribe(
      data => {
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      error => {
        this.alertService.error(error.message);
      });

  }

}
