import { ILesson } from 'src/lessons/interfaces/ILesson';
import { IUser } from 'src/users/interfaces/IUser';
import { StatusEnum } from '../status.enum';

export interface ICourse {
  id?: number;
  title: string;
  startDate: Date;
  endDate: Date;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
  lessons?: ILesson[];
  users?: IUser[];
}
