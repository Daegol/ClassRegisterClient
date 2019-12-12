import { Guid } from 'guid-typescript';
export class GroupToEdit {
    name: string;
    tutorId: Guid;
    studentsId: Guid[];
    classId: Guid;
}
