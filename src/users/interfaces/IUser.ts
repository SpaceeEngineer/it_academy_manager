import { ICourse } from 'src/courses/interfaces/ICourse';
import { ILesson } from 'src/lessons/interfaces/ILesson';
import { IRole } from 'src/roles/interfaces/IRole';
import { IUserLoginHistory } from 'src/userLoginHistory/interfaces/IUserLoginHistory';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  telephone?: string;
  city?: string;
  dob?: Date;
  accouuntStatus: string;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
  role?: IRole;
  courses?: ICourse[];
  lessons?: ILesson[];
  user_login_history?: IUserLoginHistory[];
}
