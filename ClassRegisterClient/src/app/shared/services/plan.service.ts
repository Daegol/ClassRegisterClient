import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { Plan } from '../models/plan';
import { environment } from 'src/environments/environment';
import { PlanToAdd } from '../models/planToAdd';

@Injectable({ providedIn: 'root' })
export class PlanService {
  constructor(private http: HttpClient) {}

  getPlan(id: Guid) {
      return this.http.get<Plan>(`${environment.apiUrl}classes/plan/${id}`);
  }

  addPlan(plan: PlanToAdd) {
      return this.http.post(`${environment.apiUrl}classes/plan/add`, plan);
  }

  deletePlan(classId: Guid) {
    return this.http.delete(`${environment.apiUrl}classes/plan/delete/${classId}`);
  }

}