import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { COURSE_REPOSITORY } from 'src/shared/constants/daoConstants';
import { ICourse } from '../interfaces/ICourse';
import { ICourseService } from '../interfaces/ICourseService';
import { Course } from '../entities/Course';
import { IUserService } from 'src/users/interfaces/IUserService';
import { ROLE_SERVICE, USER_SERVICE } from 'src/shared/constants/serviceConstants';
import { ICourseRepository } from '../interfaces/ICourseRepository';
import { StatusEnum } from '../status.enum';
import { RoleEnum } from 'src/roles/roles.enum';
import { IRoleService } from 'src/roles/interfaces/IRoleService';

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRepository,
    @Inject(USER_SERVICE)
    private readonly usersService: IUserService,
    @Inject(ROLE_SERVICE)
    private readonly roleService: IRoleService,
  ) {}

  async getAll(): Promise<ICourse[]> {
    return await this.courseRepository.getAll();
  }

  async getOneById(id: number, req: any): Promise<ICourse> {
    if ((await this.roleService.getRoleById(req.user.roleId)).roleName === RoleEnum.USER) {
      const courseForUser = await this.courseRepository.getCourseForUser(id);
      if (!courseForUser) throw new NotFoundException('Course not found');
      return courseForUser;
    } else {
      const courseForManager = await this.courseRepository.getOneById(id);
      if (!courseForManager) throw new NotFoundException(`Course with id ${id} not found!`);
      return courseForManager;
    }
  }

  async create(data: Course): Promise<ICourse> {
    if (data.status === StatusEnum.ACTIVE || data.status === StatusEnum.INACTIVE) {
      return await this.courseRepository.create(data);
    } else {
      throw new HttpException('Incorrect course status parameter', 400);
    }
  }

  async update(id: number, data: any): Promise<boolean> {
    const course = await this.courseRepository.getOneById(id);
    if (!course) throw new NotFoundException(`Course with id ${id} not found!`);

    return await this.courseRepository.update(id, data);
  }

  async getAllAboutCourse(): Promise<ICourse[]> {
    return await this.courseRepository.getAllAboutCourse();
  }

  async addStudents(id: number, studentId: number): Promise<Course> {
    const course = await this.courseRepository.getOneById(id);

    if (!course) throw new NotFoundException(`Course with id ${id} not found!`);

    const student = await this.usersService.getOneById(studentId);

    if (!student) throw new NotFoundException(`Student with id ${studentId} not found!`);

    const findStudent = course.users.find((user) => user.id === studentId);

    if (findStudent)
      throw new ConflictException(
        `A student with id ${studentId} has already been added to the course`,
      );

    course.users.push(student);

    const result = await this.courseRepository.updateStudentsInCourse(course);

    return result;
  }

  async deleteStudents(id: number, studentId: number): Promise<Course> {
    const course = await this.courseRepository.getOneById(id);

    if (!course) throw new NotFoundException(`Course with id ${id} not found!`);

    const student = await this.usersService.getOneById(studentId);

    if (!student) throw new NotFoundException(`Student with id ${studentId} not found!`);

    const findStudent = course.users.find((user) => user.id === studentId);

    if (!findStudent)
      throw new NotFoundException(`A student with id ${studentId} not found in the course`);

    course.users = course.users.filter((user) => user.id !== studentId);

    const result = await this.courseRepository.updateStudentsInCourse(course);

    return result;
  }

  async delete(id: number): Promise<boolean> {
    const course = await this.courseRepository.getOneById(id);
    if (!course) throw new NotFoundException(`Course not found!`);

    return await this.courseRepository.delete(id);
  }
}
