import { Guid } from 'guid-typescript';
export class GroupToEdit {
    name: string;
    tutorId: string;
    studentsId: Guid[];
    classId: Guid;
}
