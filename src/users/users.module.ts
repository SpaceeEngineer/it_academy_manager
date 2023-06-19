import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/roles/entities/Role';
import { RolesModule } from 'src/roles/roles.module';
import { diUserRepository } from 'src/shared/diConfig/daoDiConfig';
import { diUserService } from 'src/shared/diConfig/serviceDiConfig';
import { User } from './entities/User';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), RolesModule, forwardRef(() => AuthModule)],

  controllers: [UsersController],
  providers: [diUserService, diUserRepository],
  exports: [diUserService],
})
export class UsersModule {}
