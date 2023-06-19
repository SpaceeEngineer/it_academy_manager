import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/Role';
import { IRoleRepository } from '../interfaces/IRoleRepository';

export class RoleRepository implements IRoleRepository {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  async getOneById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ id });
    return role;
  }
}
