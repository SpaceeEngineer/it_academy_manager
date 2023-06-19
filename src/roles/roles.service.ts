import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from 'src/shared/constants/daoConstants';
import { IRole } from './interfaces/IRole';
import { IRoleRepository } from './interfaces/IRoleRepository';
import { IRoleService } from './interfaces/IRoleService';

@Injectable()
export class RolesService implements IRoleService {
  @Inject(ROLE_REPOSITORY)
  private readonly roleRepository: IRoleRepository;

  async getRoleById(id: number): Promise<IRole> {
    const role = await this.roleRepository.getOneById(id);
    return role;
  }
}
