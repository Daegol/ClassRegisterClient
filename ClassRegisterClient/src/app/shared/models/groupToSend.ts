import { Guid } from 'guid-typescript';
export class GroupToSend {
    name: string;
    tutorId: Guid;
    studentsId: Guid[];
}
