import { Guid } from 'guid-typescript';

export class StudentsInGroup {
    id: Guid;
    isChecked: boolean;
    firstName: string;
    lastName: string;
    pesel: string;
    studentClass: string;
}
