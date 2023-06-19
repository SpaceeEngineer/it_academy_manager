import { ILesson } from './ILesson';
import { ILessonInfo } from './ILessonInfo';

export interface ILessonService {
  findAll(): Promise<ILesson[]>;

  findOne(id: number): Promise<ILesson>;

  create(data: ILesson): Promise<ILesson>;

  delete(id: number): Promise<boolean>;

  update(id: number, data: any): Promise<boolean>;

  findOneWithRoleCheck(id: number): Promise<ILessonInfo>;
}
