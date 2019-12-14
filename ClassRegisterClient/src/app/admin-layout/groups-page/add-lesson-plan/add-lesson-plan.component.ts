import { Component, OnInit } from "@angular/core";
import { GroupService, PlanService, AlertService } from "src/app/shared";
import { Router } from "@angular/router";
import { Plan } from "src/app/shared/models/plan";
import { Lesson } from "src/app/shared/models/lesson";
import { SubjectToTable } from "src/app/shared/models/subjectToTable";
import { SubjectService } from "src/app/shared/services/subject.service";
import { first } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Guid } from "guid-typescript";
import { PlanToAdd } from "src/app/shared/models/planToAdd";
import { LessonToAdd } from "src/app/shared/models/lessonToAdd";
import { GroupsTable } from "src/app/shared/models/groupsTable";

@Component({
  selector: "app-add-lesson-plan",
  templateUrl: "./add-lesson-plan.component.html",
  styleUrls: ["./add-lesson-plan.component.scss"]
})
export class AddLessonPlanComponent implements OnInit {
  lessons: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  monday: string[] = [];
  tuesday: string[] = [];
  wednesday: string[] = [];
  thursday: string[] = [];
  friday: string[] = [];
  subjectElements: SubjectToTable[];
  currentClass: GroupsTable;

  constructor(
    private groupService: GroupService,
    private planService: PlanService,
    private alertService: AlertService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.groupService.currentEditedClassId.subscribe(
      message => (this.currentClass = message)
    );
    this.subjectService
      .getAllSubjects()
      .pipe(first())
      .subscribe(
        result => {
          this.subjectElements = result;
          for (let i = 0; i < 8; i++) {
            this.monday[i] = "";
            this.tuesday[i] = "";
            this.wednesday[i] = "";
            this.thursday[i] = "";
            this.friday[i] = "";
          }
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  cancel() {
    this.router.navigate(["groups-page"]);
  }

  save() {
    const mondayToAdd: LessonToAdd[] = [];
    const tuesdayToAdd: LessonToAdd[] = [];
    const wednesdayToAdd: LessonToAdd[] = [];
    const thursdayToAdd: LessonToAdd[] = [];
    const fridayToAdd: LessonToAdd[] = [];
    const planToAdd: PlanToAdd = {
      monday: mondayToAdd,
      tuesday: tuesdayToAdd,
      wednesday: wednesdayToAdd,
      thursday: thursdayToAdd,
      friday: fridayToAdd,
      classId: this.currentClass.databaseId
    };
    for (let i = 0; i < 8; i++) {
      if (this.monday[i] !== "") {
        const mon: LessonToAdd = {
          lessonHour: i,
          subjectId: this.monday[i]
        };
        planToAdd.monday.push(mon);
      }
      if (this.tuesday[i] !== "") {
        const tue: LessonToAdd = {
          lessonHour: i,
          subjectId: this.tuesday[i]
        };
        planToAdd.tuesday.push(tue);
      }
      if (this.wednesday[i] !== "") {
        const wed: LessonToAdd = {
          lessonHour: i,
          subjectId: this.wednesday[i]
        };
        planToAdd.wednesday.push(wed);
      }
      if (this.thursday[i] !== "") {
        const thur: LessonToAdd = {
          lessonHour: i,
          subjectId: this.thursday[i]
        };
        planToAdd.thursday.push(thur);
      }
      if (this.friday[i] !== "") {
        const fri: LessonToAdd = {
          lessonHour: i,
          subjectId: this.friday[i]
        };
        planToAdd.friday.push(fri);
      }
    }
    this.planService.addPlan(planToAdd).pipe(first()).subscribe(
      result => {
        this.alertService.success("Plan został dodany",true);
        this.router.navigate(["groups-page"]);
      },
      error => {
        this.alertService.error(error);
      }
    )
  }
}
