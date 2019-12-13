import { Guid } from 'guid-typescript';

export class StudentsInGroup {
    id: Guid;
    isAssigned: boolean;
    firstName: string;
    lastName: string;
    pesel: string;
    studentClass: string;
}
