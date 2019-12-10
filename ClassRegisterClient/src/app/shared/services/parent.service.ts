import { Parent } from './../models/parent';
import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ParentService {
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<UserTable[]>(`${environment.apiUrl}parents`);
    }

    register(parent: UserRegistrationDto) {
        return this.http.post(`${environment.apiUrl}auth/register`, parent);
    }

    delete(pesel: string) {
        return this.http.delete(`${environment.apiUrl}parents/${pesel}`);
    }

    update(parent: Parent) {
        return this.http.put(`${environment.apiUrl}parents/update`, parent);
    }
}
