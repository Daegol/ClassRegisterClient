import { GroupToEdit } from './../models/groupToEdit';
import { Guid } from 'guid-typescript';
import { GroupsTable } from 'src/app/shared/models/groupsTable';
import { environment } from 'src/environments/environment';
import { GroupToSend } from '../models/groupToSend';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupService {
    emptyGuid = Guid.createEmpty();
    private editedClass = new BehaviorSubject<GroupsTable>({
        databaseId: this.emptyGuid, name: '', tutor: '', studentsNumber: 0, id: 0, tutorPesel: ''
    });
    currentEditedClassId = this.editedClass.asObservable();

    constructor(private http: HttpClient) { }

    addGroup(group: GroupToSend) {
        return this.http.post(`${environment.apiUrl}classes/add`, group);
    }

    getAllGroups() {
        return this.http.get<GroupsTable[]>(`${environment.apiUrl}classes`);
    }

    removeGroup(id: Guid) {
        return this.http.delete(`${environment.apiUrl}classes/${id}`);
    }

    updateGroup(groupToUpdate: GroupToEdit) {
        return this.http.put(`${environment.apiUrl}classes/update`, groupToUpdate);
    }

    changeEditedClassId(message: GroupsTable) {
        this.editedClass.next(message);
    }

}
