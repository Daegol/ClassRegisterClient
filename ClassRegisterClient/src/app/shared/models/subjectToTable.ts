import { GroupAssignedToSubject } from './groupAssignedToSubject';
import { Guid } from 'guid-typescript';
export class SubjectToTable {
    id: number;
    collapsed: boolean;
    name: string;
    teacherName: string;
    teacherPesel: string;
    groupsAssignedToSubject: GroupAssignedToSubject[];
    databaseId: Guid;
}
