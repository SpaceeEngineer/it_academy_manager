import { ICourse } from './ICourse';

export interface ICourseService {
  getAll(): Promise<ICourse[]>;

  getOneById(id: number, data: any): Promise<ICourse>;

  create(data: ICourse): Promise<ICourse>;

  update(id: number, data: any): Promise<boolean>;

  addStudents(id: number, studentId: number): Promise<ICourse | string>;

  deleteStudents(id: number, studentId: number): Promise<ICourse | string>;

  getAllAboutCourse(): Promise<ICourse[]>;

  delete(id: number): Promise<boolean>;
}
