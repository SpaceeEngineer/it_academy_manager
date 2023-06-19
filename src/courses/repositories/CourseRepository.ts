import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/Course';
import { ICourseRepository } from '../interfaces/ICourseRepository';
import { Lesson } from 'src/lessons/entities/Lesson';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async getAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getAllAboutCourse(): Promise<Course[]> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.users', 'user')
      .leftJoinAndMapMany('course.lessons', Lesson, 'lesson', 'lesson.courseId = course.id')
      .getMany();
  }

  async getOneById(id: number): Promise<Course> {
    const course = this.courseRepository
      .createQueryBuilder('course')
      .leftJoin('course.lessons', 'lesson')
      .addSelect(['lesson.id', 'lesson.title', 'lesson.link', 'lesson.dateAndTime'])
      .leftJoin('course.users', 'user')
      .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.email',])
      .where('course.id = :id', { id })
      .getOne();

    return course;
  }

  async create(data: Course): Promise<Course> {
    return await this.courseRepository.save(data);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.courseRepository.delete(id);
    return !!result.affected;
  }

  async update(id: number, data: any): Promise<boolean> {
    const result = await this.courseRepository.update(id, data);
    return !!result.affected;
  }

  async updateStudentsInCourse(course: Course) {
    const result = await this.courseRepository.save(course);
    return result;
  }

  async getCourseForUser(id: number): Promise<Course> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .select('course.title')
      .leftJoin('course.lessons', 'lesson')
      .addSelect(['lesson.id', 'lesson.title', 'lesson.link', 'lesson.dateAndTime'])
      .where('course.id = :id', { id })
      .getOne();
  }
}
