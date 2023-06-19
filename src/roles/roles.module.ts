import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diRoleRepository } from 'src/shared/diConfig/daoDiConfig';
import { diRoleService } from 'src/shared/diConfig/serviceDiConfig';
import { Role } from './entities/Role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [diRoleService, diRoleRepository],
  exports: [diRoleService],
})
export class RolesModule {}
