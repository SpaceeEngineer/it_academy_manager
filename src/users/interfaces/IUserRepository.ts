import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IUser } from './IUser';
import { IUserPagination } from './IUserPagination';
import { ICourse } from '../../courses/interfaces/ICourse';

export interface IUserRepository {
  getAll(options: IPaginationOptions): Promise<IUserPagination>;

  getOneById(id: number): Promise<IUser>;

  create(data: IUser): Promise<IUser>;

  getOneByEmail(email: string): Promise<IUser>;

  delete(id: number): Promise<boolean>;

  update(id: number, data: any): Promise<boolean>;

  getMyProfileInfo(id: number): Promise<IUser>;

  getOneByEmailForValidate(email: string): Promise<IUser>;

  getAllMyCourses(authUser: IUser): Promise<ICourse[]>;
}
