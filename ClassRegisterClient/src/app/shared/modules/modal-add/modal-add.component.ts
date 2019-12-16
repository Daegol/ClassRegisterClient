import { StudentService } from 'src/app/shared';
import { StudentToParent } from './../../models/studentsToParent';
import { UserRegistrationDto } from './../../models/userRegistrationDto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MDBModalRef } from 'angular-bootstrap-md';
import { first } from 'rxjs/operators';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent {

  validationForm: FormGroup;
  public saveButtonClicked: Subject<any> = new Subject<any>();
  public newRow: UserRegistrationDto;
  public isParent: boolean = false;
  studentsElements: StudentToParent[] =[];

  constructor(public fb: FormBuilder, public modalRef: MDBModalRef, private studentService: StudentService) {
    studentService.getToParent().pipe(first()).subscribe(
      result => {
        this.studentsElements = result;
      }
    )
    this.validationForm = fb.group({
      emailForm: [null, [Validators.required, Validators.email]],
      passwordForm: [null, [Validators.required, Validators.minLength(10)]],
      peselForm: [null, [Validators.required, Validators.pattern('[0-9]{11}')]],
      phoneForm: [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      lastNameForm: [null, Validators.required],
      firstNameForm: [null, Validators.required],
      streetForm: [null, Validators.required],
      houseNumberForm: [null, Validators.required],
      postCodeForm: [null, [Validators.required, Validators.pattern('[0-9]{2}[-][0-9]{3}')]],
      cityForm: [null, Validators.required],
      child: [0]
    });
  }

  addRow() {
    const student = this.studentsElements.filter(x => x.pesel === this.child.value);
    let studentId: string;
    if (student.length === 0) {
      studentId = "empty";
    } else {
      studentId = student[0].id.toString();
    }
    this.newRow = {
      Role: '', FirstName: this.firstNameForm.value, LastName: this.lastNameForm.value,
      City: this.cityForm.value, Email: this.emailForm.value, HouseNumber: this.houseNumberForm.value, PostCode: this.postCodeForm.value,
      Street: this.streetForm.value, Password: this.passwordForm.value,
      PhoneNumber: this.phoneForm.value, Pesel: this.peselForm.value, studentId: studentId
    };
    this.saveButtonClicked.next(this.newRow);
    this.modalRef.hide();
  }

  get emailForm() { return this.validationForm.get('emailForm'); }
  get passwordForm() { return this.validationForm.get('passwordForm'); }
  get peselForm() { return this.validationForm.get('peselForm'); }
  get phoneForm() { return this.validationForm.get('phoneForm'); }
  get lastNameForm() { return this.validationForm.get('lastNameForm'); }
  get firstNameForm() { return this.validationForm.get('firstNameForm'); }
  get streetForm() { return this.validationForm.get('streetForm'); }
  get houseNumberForm() { return this.validationForm.get('houseNumberForm'); }
  get postCodeForm() { return this.validationForm.get('postCodeForm'); }
  get cityForm() { return this.validationForm.get('cityForm'); }
  get child() { return this.validationForm.get('child'); }

}
