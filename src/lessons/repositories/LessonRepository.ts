import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/Lesson';
import { ILesson } from '../interfaces/ILesson';
import { ILessonRepository } from '../interfaces/ILessonRepository';

@Injectable()
export class LessonRepository implements ILessonRepository {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create(data: ILesson): Promise<Lesson> {
    return await this.lessonRepository.save(data);
  }

  async getAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async getOneById(id: number): Promise<Lesson> {
    return await this.lessonRepository.findOne({ where: { id } });
  }

  async getOneByIdForUserManager(id: number): Promise<Lesson> {
    return await this.lessonRepository
      .createQueryBuilder('lesson')
      .select('lesson.title')
      .addSelect('lesson.dateAndTime')
      .addSelect('lesson.lecturer')
      .addSelect('lesson.homeTaskDescription')
      .addSelect('lesson.link')
      .where('lesson.id=:id', { id })
      .getOne();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.lessonRepository.delete(id);
    return !!result.affected;
  }

  async updateLesson(id: number, data: any): Promise<boolean> {
    const result = await this.lessonRepository.update(id, data);
    return !!result.affected;
  }
}
