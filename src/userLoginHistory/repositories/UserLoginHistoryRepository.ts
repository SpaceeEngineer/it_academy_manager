import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserLoginHistory } from '../entities/UserLoginHistory';

import { IUserLoginHistoryRepository } from '../interfaces/IUserLoginHistoryRepository';

@Injectable()
export class UserLoginHistoryRepository implements IUserLoginHistoryRepository {
  constructor(
    @InjectRepository(UserLoginHistory)
    private readonly userLoginHistoryRepository: Repository<UserLoginHistory>,
  ) {}

  async createUserLoginHistory(userId: number): Promise<UserLoginHistory> {
    return await this.userLoginHistoryRepository.save({ userId });
  }
}
