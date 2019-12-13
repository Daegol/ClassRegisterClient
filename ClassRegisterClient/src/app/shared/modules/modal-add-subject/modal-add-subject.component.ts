import { SubjectToCreate } from './../../models/subjectToCreate';
import { SubjectService } from './../../services/subject.service';
import { AlertService } from './../../services/alert.service';
import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MDBModalRef } from 'angular-bootstrap-md';
import { TeacherInGroup } from '../../models/teacherInGroup';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-modal-add-subject',
  templateUrl: './modal-add-subject.component.html',
  styleUrls: ['./modal-add-subject.component.scss']
})
export class ModalAddSubjectComponent implements OnInit {

  validationForm: FormGroup;
  public saveButtonClicked: Subject<any> = new Subject<any>();
  teacherElements: TeacherInGroup[] = [];

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

  addRow() {
    const subject: SubjectToCreate = { name: this.validationForm.value.name, teacherPesel: this.validationForm.value.tutor };
    this.saveButtonClicked.next(subject);
    this.modalRef.hide();
  }

  get name() { return this.validationForm.get('name'); }

}

export const tutorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const tutor = control.get('tutor');

  return tutor.value !== '0' ? null : { identityRevealed: true };
};
