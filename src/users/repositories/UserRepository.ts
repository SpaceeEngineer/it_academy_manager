import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import { Course } from '../../courses/entities/Course';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    queryBuilder.select(['users.id', 'users.firstName', 'users.lastName', 'users.email', 'users.accouuntStatus']).getMany();
    return paginate(queryBuilder, options);
  }

  async getOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id }, relations: ['role', 'courses'] });
  }

  async getOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(data: IUser): Promise<User> {
    return await this.userRepository.save(data);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return !!result.affected;
  }

  async update(id: number, data: any): Promise<boolean> {
    const result = await this.userRepository.update(id, data);
    return !!result.affected;
  }

  async getMyProfileInfo(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['firstName', 'lastName', 'email', 'telephone', 'city', 'dob'],
    });
  }

  async getOneByEmailForValidate(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'roleId'],
    });
  }
  async getAllMyCourses(authUser: IUser): Promise<Course[]> {
    return await this.userRepository
      .createQueryBuilder()
      .select(['course.title', 'course.status', 'course.startDate', 'course.endDate'])
      .from(Course, 'course')
      .leftJoin('course.users', 'user')
      .where('user.id = :id', { id: authUser.id })
      .getMany();
  }
}
