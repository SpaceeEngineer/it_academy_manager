import { IUser } from 'src/users/interfaces/IUser';

export interface IUserLoginHistory {
  id?: number;
  logindAt: Date;
  userId: number;
  user?: IUser;
}
