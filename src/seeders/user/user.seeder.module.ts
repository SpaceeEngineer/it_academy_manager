import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/Role';
import { User } from 'src/users/entities/User';
import { RoleSeederModule } from '../role/role.seeder.module';
import { UserSeederService } from './user.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), RoleSeederModule],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
