import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { roles } from '../data';
import { Role } from 'src/roles/entities/Role';
import { IRole } from 'src/roles/interfaces/IRole';

@Injectable()
export class RoleSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(): Array<Promise<Role>> {
    return roles.map(async (role: IRole) => {
      return await this.roleRepository
        .findOne({ roleName: role.roleName })
        .then(async (dbRole) => {
          if (dbRole) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.roleRepository.save(role));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
