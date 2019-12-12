import { Guid } from 'guid-typescript';
export class GroupsTable {
    id: number;
    name: string;
    tutor: string;
    tutorPesel: string;
    studentsNumber: number;
    databaseId: Guid;
}
