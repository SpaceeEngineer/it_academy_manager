import { AuthService } from 'src/auth/auth.service';
import { HashService } from 'src/auth/hash.service';
import { CourseService } from 'src/courses/services/CourseService';
import { LessonService } from 'src/lessons/services/lessons.service';
import { MailService } from 'src/mail/mail.service';
import { RolesService } from 'src/roles/roles.service';
import { UserLoginHistoryService } from 'src/userLoginHistory/userLoginHistory.service';
import { UsersService } from 'src/users/users.service';

export const diUserService = {
  provide: 'USER_SERVICE',
  useClass: UsersService,
};

export const diRoleService = {
  provide: 'ROLE_SERVICE',
  useClass: RolesService,
};

export const diCourseService = {
  provide: 'COURSE_SERVICE',
  useClass: CourseService,
};

export const diMailService = {
  provide: 'MAIL_SERVICE',
  useClass: MailService,
};

export const diUserLoginHistoryService = {
  provide: 'USER_LOGIN_HISTORY_SERVICE',
  useClass: UserLoginHistoryService,
};

export const diAuthService = {
  provide: 'AUTH_SERVICE',
  useClass: AuthService,
};

export const diLessonService = {
  provide: 'LESSON_SERVICE',
  useClass: LessonService,
};

export const diHashService = {
  provide: 'HASH_SERVICE',
  useClass: HashService,
};
