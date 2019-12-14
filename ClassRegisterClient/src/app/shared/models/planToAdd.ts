import { Guid } from 'guid-typescript';
import { LessonToAdd } from './lessonToAdd';

export class PlanToAdd {
    classId: Guid;
    monday: LessonToAdd[];
    tuesday: LessonToAdd[];
    wednesday: LessonToAdd[];
    thursday: LessonToAdd[];
    friday: LessonToAdd[];
}
