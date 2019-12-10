import { Group } from './../../../shared/models/group';
import { TeacherInGroup } from './../../../shared/models/teacherInGroup';
import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { StudentService, AlertService, TeacherService, GroupService } from 'src/app/shared';
import { StudentsInGroup } from 'src/app/shared/models/studentsInGroup';
import { first } from 'rxjs/operators';
import { format } from 'url';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  studentElements: StudentsInGroup[] = [];
  teacherElements: TeacherInGroup[] = [];
  studentHeadElements = ['Wybierz', 'Imię', 'Nazwisko', 'Pesel'];
  studentTableNames = ['isChecked', 'firstName', 'lastName', 'pesel'];
  searchText = '';
  previous: string;
  form: FormGroup;

  modalRef: MDBModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private alertService: AlertService,
    private groupService: GroupService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [''],
      tutor: ['']
    });
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
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  getStudentsToGroup() {
    this.studentService.getToGroup().pipe(first())
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

  addGroup() {
    const group: Group = { name: this.form.value.name, tutorId: this.form.value.tutor, studentsId: this.getCheckedStudents() };
    this.groupService.addGroup(group).pipe(first()).subscribe(
      request => {
        this.alertService.success('Dodano grupę', true);
        this.router.navigate(['groups-page']);
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  getCheckedStudents() {
    const students: Guid[] = [];
    this.studentElements.forEach(element => {
      if (element.isChecked) {
        students.push(element.id);
      }
    });
    return students;
  }

}
