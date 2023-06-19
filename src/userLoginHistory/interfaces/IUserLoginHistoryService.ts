import { IUserLoginHistory } from './IUserLoginHistory';

export interface IUserLoginHistoryService {
  createUserLoginHistory(userId: number): Promise<IUserLoginHistory>;
}
