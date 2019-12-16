import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/shared/models/plan';
import { GroupService, PlanService, AlertService } from 'src/app/shared';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrls: ['./lesson-plan.component.scss']
})
export class LessonPlanComponent implements OnInit {

  plan: Plan;
  planIsExisting: boolean = false;
  decodedToken: any;
  elements: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  constructor(
    private groupService: GroupService,
    private planService: PlanService,
    private alertService: AlertService,
    private router: Router
  ) { }
  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.decodedToken = this.getDecodedAccessToken(currentUser.token);
    this.getPlan();
  }

  getPlan() {
    this.planService
      .getPlanForParent(this.decodedToken.nameid)
      .pipe(first())
      .subscribe(
        result => {
          this.plan = result;
          this.planIsExisting = this.plan.isExisting;
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
