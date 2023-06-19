import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../courses/entities/Course';
import { courses } from '../data';
import { ICourse } from '../../courses/interfaces/ICourse';

@Injectable()
export class CourseSeederService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  create(): Array<Promise<Course>> {
    return courses.map(async (course: ICourse) => {
      return await this.courseRepository
        .findOne({ title: course.title })
        .then(async (dbCourse) => {
          if (dbCourse) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.courseRepository.save(course));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
