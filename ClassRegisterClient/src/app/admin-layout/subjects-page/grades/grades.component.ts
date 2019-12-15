import { GradeToUpdate } from './../../../shared/models/gradeToUpdate';
import { GradeToAdd } from './../../../shared/models/gradeToAdd';
import { AlertService } from './../../../shared/services/alert.service';
import { StudentToGrade } from './../../../shared/models/studentsToGrade';
import { GradesService } from './../../../shared/services/grades.service';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SubjectToGrades } from 'src/app/shared/models/subjectToGrades';
import { StudentService } from 'src/app/shared';
import { first } from 'rxjs/operators';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Guid } from 'guid-typescript';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Grade } from 'src/app/shared/models/grade';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  searchText = '';
  previous = '';
  subjectToGrade: SubjectToGrades;
  headElements = ['ID', 'Imię', 'Nazwisko', 'Pesel', 'Dodaj'];
  masterHeadElements = ['ID', 'Ocena', 'Typ', 'Akcja'];
  tableNames = ['id', 'firstName', 'lastName', 'pesel'];
  elements: StudentToGrade[] = [];
  constructor(private gradesService: GradesService,
    private studentsService: StudentService,
    private alertService: AlertService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.gradesService.currentEditedClassId.subscribe(message => this.subjectToGrade = message);
    this.getStudentsWithGrades();
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

  getStudentsWithGrades() {
    this.studentsService.getToGrades(this.subjectToGrade.groupId).pipe(first()).subscribe(
      result => {
        this.elements = result;
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();
      },
      error => {
        this.alertService.error(error);
      }
    );
  }



  addGrade(el: StudentToGrade) {
    el.grades.push({ id: Guid.createEmpty(), value: 1, type: "Sprawdzian" });
    this.mdbTable.setDataSource(this.elements);
  }

  save(el: StudentToGrade, grade: Grade) {
    const empty = Guid.createEmpty().toString();
    if (grade.id.toString() === empty) {
      const gradeToAdd: GradeToAdd = { value: grade.value, type: grade.type,
        studentPesel: el.pesel, subjectId: this.subjectToGrade.subjectId };
      this.gradesService.addGrade(gradeToAdd).pipe(first()).subscribe(
        result => {
          this.alertService.success("Ocena została dodana");
          this.getStudentsWithGrades();
        },
        error => {
          this.alertService.error(error);
        });
    } else {
      const gradeToUpdate: GradeToUpdate = { value: grade.value, gradeId: grade.id, studentPesel: el.pesel, type: grade.type };
      this.gradesService.updateGrade(gradeToUpdate).pipe(first()).subscribe(
        result => {
          this.alertService.success("Ocena została zmieniona");
          this.getStudentsWithGrades();
        },
        error => {
          this.alertService.error(error);
        });
    }
  }

  delete(el: StudentToGrade, grade: Grade) {
    const empty = Guid.createEmpty().toString();
    if (grade.id.toString() !== empty) {
      this.gradesService.deleteGrade(grade.id).pipe(first()).subscribe(
        result => {
          this.alertService.success("Ocena została usunięta");
          this.getStudentsWithGrades();
        },
        error => {
          this.alertService.error(error);
        });
    } else {
      const index: number = el.grades.indexOf(grade);
      if (index !== -1) {
        el.grades.splice(index, 1);
        this.mdbTable.setDataSource(this.elements);
      }
    }
  }

}
