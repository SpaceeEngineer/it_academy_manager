import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diCourseRepository } from 'src/shared/diConfig/daoDiConfig';
import { diCourseService } from 'src/shared/diConfig/serviceDiConfig';
import { CourseController } from './controllers/CourseController';
import { Course } from './entities/Course';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    RolesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => LessonsModule),
  ],
  controllers: [CourseController],
  providers: [diCourseService, diCourseRepository],
  exports: [diCourseService],
})
export class CoursesModule {}
