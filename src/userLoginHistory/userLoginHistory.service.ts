import { Inject, Injectable } from '@nestjs/common';
import { USER_LOGIN_HISTORY_REPOSITORY } from 'src/shared/constants/daoConstants';
import { IUserLoginHistory } from './interfaces/IUserLoginHistory';
import { IUserLoginHistoryRepository } from './interfaces/IUserLoginHistoryRepository';
import { IUserLoginHistoryService } from './interfaces/IUserLoginHistoryService';

@Injectable()
export class UserLoginHistoryService implements IUserLoginHistoryService {
  constructor(
    @Inject(USER_LOGIN_HISTORY_REPOSITORY)
    private readonly userLoginHistoryRepository: IUserLoginHistoryRepository,
  ) {}

  async createUserLoginHistory(userId: number): Promise<IUserLoginHistory> {
    return await this.userLoginHistoryRepository.createUserLoginHistory(userId);
  }
}
