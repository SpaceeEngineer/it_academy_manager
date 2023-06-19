import { IUserLoginHistory } from './IUserLoginHistory';

export interface IUserLoginHistoryRepository {
  createUserLoginHistory(userId: number): Promise<IUserLoginHistory>;
}
