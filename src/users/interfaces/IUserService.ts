import { ICreateUser } from './ICreateUser';
import { IUpdateUser } from './IUpdateUser';
import { IUser } from './IUser';
import { IUserPagination } from './IUserPagination';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IEditUserProfile } from './IEditUserProfile';
import { ICreateUserPartially } from './ICreateUserPartially';
import { ICourse } from '../../courses/interfaces/ICourse';

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser>;

  createUser(createUser: ICreateUser): Promise<IUser>;

  getAll(options: IPaginationOptions): Promise<IUserPagination>;

  getOneById(id: number): Promise<IUser>;

  update(id: number, updateUserData: IUpdateUser): Promise<boolean>;

  remove(id: number): Promise<boolean>;

  editUserProfile(id: number, editUserProfile: IEditUserProfile): Promise<boolean>;

  getUserForManager(id: number): Promise<IUser>;

  updateUserInfoByManager(id: number, updateUserDto: IUpdateUser): Promise<boolean>;

  getMyProfileInfo(req: IUser): Promise<IUser>;

  getOneByEmailForValidate(email: string): Promise<IUser>;

  createUserPartially(createUserData: ICreateUserPartially): Promise<IUser>;

  getAllMyCourses(authUser: IUser): Promise<ICourse[]>;
}
