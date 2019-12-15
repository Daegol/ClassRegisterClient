import { GroupsTable } from 'src/app/shared/models/groupsTable';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef } from 'angular-bootstrap-md';
import { StudentsInGroup } from 'src/app/shared/models/studentsInGroup';
import { TeacherInGroup } from 'src/app/shared/models/teacherInGroup';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { StudentService, TeacherService, AlertService, GroupService } from 'src/app/shared';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GroupToEdit } from 'src/app/shared/models/groupToEdit';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  studentElements: StudentsInGroup[] = [];
  teacherElements: TeacherInGroup[] = [];
  studentHeadElements = ['Wybierz', 'Imię', 'Nazwisko', 'Pesel', 'Klasa'];
  studentTableNames = ['isChecked', 'firstName', 'lastName', 'pesel', 'studentClass'];
  searchText = '';
  previous: string;
  form: FormGroup;
  currentEditedClass: GroupsTable;

  modalRef: MDBModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private alertService: AlertService,
    private groupService: GroupService,
    private router: Router) { }

  ngOnInit() {
    this.groupService.currentEditedClassId.subscribe(message => this.currentEditedClass = message);
    this.form = this.formBuilder.group({
      name: [this.currentEditedClass.name, [Validators.required, Validators.minLength(1)]],
      tutor: new FormControl('0')
    }, { validators: tutorValidator });
    this.getTeachersToGroup();
    this.getStudentsToGroup();
  }

  @HostListener('input') oninput() { this.searchItems(); }

  searchItems() {
    const prev =
      this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); this.studentElements =
        this.mdbTable.getDataSource();

    }
    if (this.searchText) {
      this.studentElements =
        this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  getTeachersToGroup() {
    this.teacherService.getToGroup().pipe(first())
      .subscribe(
        result => {
          this.teacherElements = result;
          this.form.controls.tutor.setValue(this.currentEditedClass.tutorPesel);
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  getStudentsToGroup() {
    this.studentService.getToGroupEdit(this.currentEditedClass.databaseId).pipe(first())
      .subscribe(
        result => {
          this.studentElements = result;
          this.mdbTable.setDataSource(this.studentElements);
          this.previous = this.mdbTable.getDataSource();
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  editGroup() {
    const group: GroupToEdit = {
      name: this.form.value.name, tutorId: this.form.value.tutor,
      studentsId: this.getCheckedStudents(), classId: this.currentEditedClass.databaseId
    };
    this.groupService.updateGroup(group).pipe(first()).subscribe(
      request => {
        this.alertService.success('Edytowano grupę', true);
        this.router.navigate(['admin/groups-page']);
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  getCheckedStudents() {
    const students: Guid[] = [];
    this.studentElements.forEach(element => {
      if (element.isAssigned) {
        students.push(element.id);
      }
    });
    return students;
  }

  get name() { return this.form.get('name'); }


  cancel() {
    this.router.navigate(['admin/groups-page']);
  }
}

export const tutorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const tutor = control.get('tutor');

  return tutor.value !== '0' ? null : { identityRevealed: true };
};
