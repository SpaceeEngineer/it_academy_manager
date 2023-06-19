import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/Role';

import { RoleSeederService } from '../role/role.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleSeederService],
  exports: [RoleSeederService],
})
export class RoleSeederModule {}
