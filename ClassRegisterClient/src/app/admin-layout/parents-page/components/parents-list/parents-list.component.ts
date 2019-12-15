import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UserTable } from 'src/app/shared/models/userTable';
import { ParentService, AlertService } from 'src/app/shared';
import { ModalEditComponent } from 'src/app/shared/modules/modal-edit/modal-edit.component';
import { Parent } from 'src/app/shared/models/parent';
import { first } from 'rxjs/operators';
import { ModalAddComponent } from 'src/app/shared/modules/modal-add/modal-add.component';
import { UserRegistrationDto } from 'src/app/shared/models/userRegistrationDto';

@Component({
  selector: 'app-parents-list',
  templateUrl: './parents-list.component.html',
  styleUrls: ['./parents-list.component.scss']
})
export class ParentsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: UserTable[] = [];
  headElements = ['Id', 'Imię', 'Nazwisko', 'Email', 'Pesel', 'Numer telefonu', 'Adres','Pesel Dziecka', 'Akcja'];
  tableNames = ['id', 'firstName', 'lastName', 'email', 'pesel', 'phoneNumber', 'address', 'parentPesel'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private parentService: ParentService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getparents();
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
    this.modalRef.content.saveButtonClicked.subscribe((newElement: Parent) => {
      this.parentService.update(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dane użytkownika zostały zaaktualizowane');
          this.getparents();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
    this.mdbTable.setDataSource(this.elements);
  }

  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.parentService.delete(this.elements[elementIndex].pesel).pipe(first()).subscribe(
      success => {
        this.alertService.success('Użytkownik został usunięty');
        this.getparents();
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
      newElement.Role = 'Parent';
      this.parentService.register(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dodano nowego użytkownika');
          this.getparents();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
  }

  getparents() {
    this.parentService.getAll().pipe(first()).subscribe(
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
