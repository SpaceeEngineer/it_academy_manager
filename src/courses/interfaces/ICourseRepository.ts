import { ICourse } from './ICourse';

export interface ICourseRepository {
  getAll(): Promise<ICourse[]>;

  getOneById(id: number): Promise<ICourse>;

  create(data: ICourse): Promise<ICourse>;

  delete(id: number): Promise<boolean>;

  update(id: number, data: any): Promise<boolean>;

  getAllAboutCourse(): Promise<ICourse[]>;

  updateStudentsInCourse(course: ICourse);

  getCourseForUser(id: number): Promise<ICourse>;
}
