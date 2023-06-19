import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoginHistory } from './entities/UserLoginHistory';
import { diUserLoginHistoryService } from 'src/shared/diConfig/serviceDiConfig';
import { diUserLoginHistoryRepository } from 'src/shared/diConfig/daoDiConfig';

@Module({
  imports: [TypeOrmModule.forFeature([UserLoginHistory])],
  providers: [diUserLoginHistoryService, diUserLoginHistoryRepository],
  exports: [diUserLoginHistoryService],
})
export class UserLoginHistoryModule {}
