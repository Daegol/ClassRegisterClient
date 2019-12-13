import { SubjectToUpdate } from './../../models/subjectToUpdate';
import { SubjectToTable } from 'src/app/shared/models/subjectToTable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { TeacherInGroup } from '../../models/teacherInGroup';
import { MDBModalRef } from 'angular-bootstrap-md';
import { TeacherService, AlertService } from '../..';
import { SubjectService } from '../../services/subject.service';
import { first } from 'rxjs/operators';
import { SubjectToCreate } from '../../models/subjectToCreate';

@Component({
  selector: 'app-modal-edit-subject',
  templateUrl: './modal-edit-subject.component.html',
  styleUrls: ['./modal-edit-subject.component.scss']
})
export class ModalEditSubjectComponent implements OnInit {

  validationForm: FormGroup;
  public saveButtonClicked: Subject<any> = new Subject<any>();
  teacherElements: TeacherInGroup[] = [];
  editedRow: SubjectToTable;

  constructor(public fb: FormBuilder, public modalRef: MDBModalRef,
              private teacherService: TeacherService, private alertService: AlertService,
              private subjectService: SubjectService) {
    this.validationForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(1)]],
      tutor: new FormControl('0')
    }, { validators: tutorValidator });
  }

  ngOnInit() {
    this.getTeachers();
    this.validationForm.controls.name.patchValue(this.editedRow.name);
    this.validationForm.controls.tutor.patchValue(this.editedRow.teacherPesel);
  }

  getTeachers() {
    this.teacherService.getToGroup().pipe(first())
      .subscribe(
        result => {
          this.teacherElements = result;
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  editRow() {
    const subject: SubjectToUpdate = {
      name: this.validationForm.value.name, teacherPesel: this.validationForm.value.tutor, id: this.editedRow.databaseId
    };
    this.saveButtonClicked.next(subject);
    this.modalRef.hide();
  }

  get name() { return this.validationForm.get('name'); }

}

export const tutorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const tutor = control.get('tutor');

  return tutor.value !== '0' ? null : { identityRevealed: true };
};
