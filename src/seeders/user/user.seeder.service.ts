import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/Role';
import { User } from 'src/users/entities/User';
import { IUser } from 'src/users/interfaces/IUser';

import { Repository } from 'typeorm';
import { users, userRoleMapping } from '../data';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.userRepository
        .findOne({ email: user.email })
        .then(async (dbUser) => {
          if (dbUser) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.userRepository.save({
              ...user,
              role: await this.roleRepository.findOne({
                roleName: userRoleMapping.get(user.email),
              }),
            }),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
