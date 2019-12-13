import { SubjectToTable } from './../models/subjectToTable';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubjectToCreate } from '../models/subjectToCreate';
import { SubjectToUpdate } from '../models/subjectToUpdate';



@Injectable({ providedIn: 'root' })
export class SubjectService {
    constructor(private http: HttpClient) { }

    addSubject(subject: SubjectToCreate) {
        return this.http.post(`${environment.apiUrl}subjects/add`, subject);
    }

    removeSubject(subjectId: Guid) {
        return this.http.delete(`${environment.apiUrl}subjects/remove/${subjectId}`);
    }

    editSubject(subject: SubjectToUpdate) {
        return this.http.put(`${environment.apiUrl}subjects/update`, subject);
    }

    getAllSubjects() {
        return this.http.get<SubjectToTable[]>(`${environment.apiUrl}subjects`);
    }

}
