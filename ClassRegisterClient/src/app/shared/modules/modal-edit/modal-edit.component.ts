import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Student } from '../../models/student';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  public editableRow: {
    id: string, firstName: string, lastName: string, email: string, pesel: string, phoneNumber: string, address: string
  };
  public editedRow: Student;
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    pesel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
    address: new FormControl('',
    [Validators.required, Validators.pattern('[a-zA-Z0-9]+[ ][a-zA-Z0-9]+[ ][0-9]{2}[-][0-9]{3}[ ][a-zA-Z0-9]+')])
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.firstName);
    this.form.controls.last.patchValue(this.editableRow.lastName);
    this.form.controls.email.patchValue(this.editableRow.email);
    this.form.controls.phone.patchValue(this.editableRow.phoneNumber);
    this.form.controls.address.patchValue(this.editableRow.address.replace('\n', ' '));
    this.form.controls.pesel.patchValue(this.editableRow.pesel);
  }

  editRow() {
    this.editedRow = {
      FirstName: this.first.value, LastName: this.last.value, Email: this.email.value,
      Pesel: this.pesel.value, PhoneNumber: this.phone.value, Address: this.address.value
    };
    this.saveButtonClicked.next(this.editedRow);
    this.modalRef.hide();
  }

  get first() { return this.form.get('first'); }

  get last() { return this.form.get('last'); }

  get email() { return this.form.get('email'); }

  get phone() { return this.form.get('phone'); }

  get address() { return this.form.get('address'); }

  get pesel() { return this.form.get('pesel'); }

}
