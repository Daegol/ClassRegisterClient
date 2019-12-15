import { StudentToGrade } from './../models/studentsToGrade';
import { StudentsInGroup } from 'src/app/shared/models/studentsInGroup';
import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';


@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<UserTable[]>(`${environment.apiUrl}students`);
    }

    register(student: UserRegistrationDto) {
        return this.http.post(`${environment.apiUrl}auth/register`, student);
    }

    delete(pesel: string) {
        return this.http.delete(`${environment.apiUrl}students/${pesel}`);
    }

    update(student: Student) {
        return this.http.put(`${environment.apiUrl}students/update`, student);
    }

    getToGroup() {
        return this.http.get<StudentsInGroup[]>(`${environment.apiUrl}students/stg`);
    }

    getToGroupEdit(classId: Guid) {
        return this.http.get<StudentsInGroup[]>(`${environment.apiUrl}students/stg/${classId}`);
    }

    getToGrades(classId: Guid) {
        return this.http.get<StudentToGrade[]>(`${environment.apiUrl}students/grade/${classId}`);
    }
}
