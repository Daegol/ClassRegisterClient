import { environment } from 'src/environments/environment';
import { Group } from './../models/group';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GroupService {
    constructor(private http: HttpClient) { }

    addGroup(group: Group) {
        return this.http.post(`${environment.apiUrl}classes/add`, group);
    }

}
