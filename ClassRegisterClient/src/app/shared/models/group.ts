import { Guid } from 'guid-typescript';
export class Group {
    name: string;
    tutorId: Guid;
    studentsId: Guid[];
}
