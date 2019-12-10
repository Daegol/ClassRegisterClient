import { StudentsInGroup } from 'src/app/shared/models/studentsInGroup';
import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';


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
}
