import { Component, OnInit } from '@angular/core';
import { GroupService, PlanService, AlertService } from 'src/app/shared';
import { GroupsTable } from 'src/app/shared/models/groupsTable';
import { Plan } from 'src/app/shared/models/plan';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrls: ['./lesson-plan.component.scss']
})
export class LessonPlanComponent implements OnInit {
  currentClass: GroupsTable;
  plan: Plan;
  planIsExisting: boolean = false;
  elements: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  elements2: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  constructor(
    private groupService: GroupService,
    private planService: PlanService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.groupService.currentEditedClassId.subscribe(
      message => (this.currentClass = message)
    );
    this.planService
      .getPlan(this.currentClass.databaseId)
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

  add() {
    this.router.navigate(['groups-page/add-plan']);
  }
}
