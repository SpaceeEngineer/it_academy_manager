import { ILesson } from './ILesson';
import { ICreateLesson } from './ICreateLesson';
import { ILessonInfo } from './ILessonInfo';

export interface ILessonRepository {
  getAll(): Promise<ILesson[]>;

  getOneById(id: number): Promise<ILesson>;

  create(data: ICreateLesson): Promise<ILesson>;

  delete(id: number): Promise<boolean>;

  updateLesson(id: number, data: any): Promise<boolean>;

  getOneByIdForUserManager(id: number): Promise<ILessonInfo>;
}
