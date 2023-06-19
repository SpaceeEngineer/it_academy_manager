import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../courses/entities/Course';
import { CourseSeederService } from './course.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseSeederService],
  exports: [CourseSeederService],
})
export class CourseSeederModule {}
