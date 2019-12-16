import { ParentService, GradesService, AlertService } from 'src/app/shared';
import { StudentGrades } from './../../shared/models/studentGrades';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  headElements = ['Przedmiot', 'Oceny'];
  decodedToken: any;
  elements: StudentGrades[] = [{subject: "Przyra",grades: "2, 2, 2"}]

  constructor(private gradeService: GradesService,
              private alertService: AlertService) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.decodedToken = this.getDecodedAccessToken(currentUser.token);
    this.getGrades();
  }

  getGrades() {
    this.gradeService
      .getGradesForParent(this.decodedToken.nameid)
      .pipe(first())
      .subscribe(
        result => {
          this.elements = result;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

}
