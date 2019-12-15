import { GradeToUpdate } from './../models/gradeToUpdate';
import { GradeToAdd } from './../models/gradeToAdd';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubjectToGrades } from '../models/subjectToGrades';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GradesService {
    emptyGuid = Guid.createEmpty();
    private editedClass = new BehaviorSubject<SubjectToGrades>({
        groupId: this.emptyGuid, subjectId: this.emptyGuid, teacherName: '', subjectName: '', teacherPesel: '',
    });
    currentEditedClassId = this.editedClass.asObservable();

    constructor(private http: HttpClient) { }

    addGrade(gradeToAdd: GradeToAdd) {
        return this.http.post(`${environment.apiUrl}grades/add`, gradeToAdd);
    }

    updateGrade(gradeToUpdate: GradeToUpdate) {
        return this.http.put(`${environment.apiUrl}grades/update`, gradeToUpdate);
    }

    deleteGrade(id: Guid) {
        return this.http.delete(`${environment.apiUrl}grades/${id}`);
    }

    changeEditedClassId(message: SubjectToGrades) {
        return this.editedClass.next(message);
    }
}