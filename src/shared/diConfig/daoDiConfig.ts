import { CourseRepository } from 'src/courses/repositories/CourseRepository';
import { LessonRepository } from 'src/lessons/repositories/LessonRepository';
import { RoleRepository } from 'src/roles/repositories/RoleRepository';
import { UserLoginHistoryRepository } from 'src/userLoginHistory/repositories/UserLoginHistoryRepository';
import { UserRepository } from 'src/users/repositories/UserRepository';

export const diUserRepository = {
  provide: 'USER_REPOSITORY',
  useClass: UserRepository,
};

export const diRoleRepository = {
  provide: 'ROLE_REPOSITORY',
  useClass: RoleRepository,
};

export const diCourseRepository = {
  provide: 'COURSE_REPOSITORY',
  useClass: CourseRepository,
};

export const diUserLoginHistoryRepository = {
  provide: 'USER_LOGIN_HISTORY_REPOSITORY',
  useClass: UserLoginHistoryRepository,
};

export const diLessonRepository = {
  provide: 'LESSON_REPOSITORY',
  useClass: LessonRepository,
};
