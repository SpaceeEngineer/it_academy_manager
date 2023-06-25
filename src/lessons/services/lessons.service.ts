import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ILesson } from '../interfaces/ILesson';
import { ILessonRepository } from '../interfaces/ILessonRepository';
import { LESSON_REPOSITORY } from 'src/shared/constants/daoConstants';
import { ILessonService } from '../interfaces/ILessonService';
import { IEditLesson } from '../interfaces/IEditLesson';
import { ICreateLesson } from '../interfaces/ICreateLesson';
import { ILessonInfo } from '../interfaces/ILessonInfo';
import { COURSE_SERVICE } from 'src/shared/constants/serviceConstants';
import { ICourseService } from 'src/courses/interfaces/ICourseService';

@Injectable()
export class LessonService implements ILessonService {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
    @Inject(COURSE_SERVICE)
    private readonly courseService: ICourseService,
  ) {}

  async findAll(): Promise<ILesson[]> {
    return await this.lessonRepository.getAll();
  }

  async findOne(id: number): Promise<ILesson> {
    const lesson = await this.lessonRepository.getOneById(id);
    if (!lesson) throw new NotFoundException(`Lesson not found!`);

    return lesson;
  }

  async create(data: ICreateLesson): Promise<ILesson> {
    const req = {
      user: {
        roleId: 2
      }
    }
    const course = await this.courseService.getOneById(data.courseId, req);

    if (!course) throw new NotFoundException(`Course not found!`);

    return await this.lessonRepository.create(data);
  }

  async delete(id: number): Promise<boolean> {
    const lesson = await this.lessonRepository.getOneById(id);
    if (!lesson) throw new NotFoundException(`Lesson not found!`);

    return await this.lessonRepository.delete(id);
  }

  async update(id: number, editLesson: IEditLesson): Promise<boolean> {
    const lesson = await this.lessonRepository.getOneById(id);
    if (!lesson) throw new NotFoundException(`Lesson not found!`);

    return await this.lessonRepository.updateLesson(id, editLesson);
  }

  async findOneWithRoleCheck(id: number): Promise<ILessonInfo> {
    const lesson = await this.lessonRepository.getOneByIdForUserManager(id);
    if (!lesson) throw new NotFoundException(`Lesson not found!`);

    return lesson;
  }
}
