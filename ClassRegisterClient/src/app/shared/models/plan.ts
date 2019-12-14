import { Lesson } from './lesson';

export class Plan {
    isExisting: boolean;
    monday: Lesson[];
    tuesday: Lesson[];
    wednesday: Lesson[];
    thursday: Lesson[];
    friday: Lesson[];
}
