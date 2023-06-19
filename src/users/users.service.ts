import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ICreateUser } from './interfaces/ICreateUser';
import { ICreateUserPartially } from './interfaces/ICreateUserPartially';
import { IUserPagination } from './interfaces/IUserPagination';
import { IUpdateUser } from './interfaces/IUpdateUser';
import { IUserService } from './interfaces/IUserService';
import { IUser } from './interfaces/IUser';
import { IUserRepository } from './interfaces/IUserRepository';
import { USER_REPOSITORY } from 'src/shared/constants/daoConstants';
import { IEditUserProfile } from 'src/users/interfaces/IEditUserProfile';
import { ICourse } from '../courses/interfaces/ICourse';
import { HASH_SERVICE } from 'src/shared/constants/serviceConstants';
import { HashService } from 'src/auth/hash.service';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE)
    private hashService: HashService,
  ) {}

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.getOneByEmail(email);
    return user;
  }

  async createUser(createUser: ICreateUser): Promise<IUser> {
    const exist = await this.getOneByEmailForValidate(createUser.email);
    if (exist) {
      throw new ConflictException('Such user already exists');
    }
    const user = await this.userRepository.create(createUser);
    return user;
  }

  async getAll(options: IPaginationOptions): Promise<IUserPagination> {
    const user = await this.userRepository.getAll(options);
    return user;
  }

  async getOneById(id: number): Promise<IUser> {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserForManager(id: number): Promise<IUser> {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    ['password', 'dob', 'roleId', 'createdAt', 'updatedAt'].forEach((e) => delete user[e]);
    ['id', 'createdAt', 'updatedAt'].forEach((e) => delete user.role[e]);
    for (let i = 0; i < user.courses.length; i++) {
      ['id', 'createdAt', 'updatedAt'].forEach((e) => delete user.courses[i][e]);
    }

    return user;
  }

  async updateUserInfoByManager(id: number, updateUserDto: IUpdateUser): Promise<boolean> {
    const user = await this.getOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      const hashPassword: string = (
        await this.hashService.getHashString(updateUserDto.password)
      ).toString();
      updateUserDto.password = hashPassword;
    }

    if (await this.userRepository.getOneByEmail(updateUserDto.email)) {
      if (updateUserDto.email !== user.email) {
        throw new ConflictException('User with given email already exist');
      }
    }

    const newUser = await this.userRepository.update(id, updateUserDto);
    return newUser;
  }

  async update(id: number, updateUserData: IUpdateUser) {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.update(id, updateUserData);
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.getOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.delete(id);
  }

  async editUserProfile(id: number, editUserProfile: IEditUserProfile): Promise<boolean> {
    return await this.userRepository.update(id, editUserProfile);
  }

  async getMyProfileInfo(req: IUser): Promise<IUser> {
    const user = await this.userRepository.getMyProfileInfo(req.id);
    return user;
  }

  async getOneByEmailForValidate(email: string): Promise<IUser> {
    return await this.userRepository.getOneByEmailForValidate(email);
  }

  async createUserPartially(createUserData: ICreateUserPartially): Promise<IUser> {
    const user = await this.getUserByEmail(createUserData.email);
    if (user) {
      throw new ConflictException('Such user already exists');
    }

    const createData: IUser = { ...createUserData, roleId: 1, accouuntStatus: 'pending' };
    const newUser = await this.userRepository.create(createData);

    return newUser;
  }

  async getAllMyCourses(authUser: IUser): Promise<ICourse[]> {
    return this.userRepository.getAllMyCourses(authUser);
  }
}
