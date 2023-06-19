import { ICourse } from 'src/courses/interfaces/ICourse';
import { IUser } from 'src/users/interfaces/IUser';

export interface ILesson {
  id?: number;
  lecturer: string;
  courseId: number;
  dateAndTime: Date;
  link: string;
  homeTaskDescription: string;
  course?: ICourse;
  users?: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}
