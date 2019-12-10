import { StudentsInGroup } from './../models/studentsInGroup';
import { Teacher } from './../models/teacher';
import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TeacherInGroup } from '../models/teacherInGroup';


@Injectable({ providedIn: 'root' })
export class TeacherService {
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<UserTable[]>(`${environment.apiUrl}teachers`);
    }

    getToGroup() {
        return this.http.get<TeacherInGroup[]>(`${environment.apiUrl}teachers/tig`);
    }

    register(teacher: UserRegistrationDto) {
        return this.http.post(`${environment.apiUrl}auth/register`, teacher);
    }

    delete(pesel: string) {
        return this.http.delete(`${environment.apiUrl}teachers/${pesel}`);
    }

    update(teacher: Teacher) {
        return this.http.put(`${environment.apiUrl}teachers/update`, teacher);
    }
}
