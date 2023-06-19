import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ICourse } from '../interfaces/ICourse';
import { ICourseService } from '../interfaces/ICourseService';
import { CreateCourseDto } from '../dto/create-course.dto';
import { COURSE_SERVICE } from 'src/shared/constants/serviceConstants';
import { Roles } from 'src/roles/roles.auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { RoleEnum } from '../../roles/roles.enum';

@Controller('courses')
@ApiTags('Courses')
@ApiSecurity('JWT-auth')
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(
    @Inject(COURSE_SERVICE)
    private readonly courseService: ICourseService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'get all courses' })
  @ApiOkResponse({ description: 'The list of courses has been successfully returned' })
  async getAll(): Promise<ICourse[]> {
    return await this.courseService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get course by id' })
  @ApiOkResponse({ description: 'The course has been successfully returned' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async getOneById(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<ICourse> {
    return await this.courseService.getOneById(id, req);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.MANAGER)
  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiOperation({ summary: 'create course' })
  @ApiCreatedResponse({ description: 'The course has been successfully created' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<ICourse> {
    return await this.courseService.create(createCourseDto);
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'update course' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiOkResponse({ description: 'The course has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  updateCourse(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'add studend to course' })
  @ApiCreatedResponse({ description: 'The student has been successfully added to course' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  @ApiNotFoundResponse({ description: 'Course or student not found' })
  @ApiConflictResponse({ description: 'Student has already been added to the course' })
  @Post(':id/users/:userId')
  addStudents(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.courseService.addStudents(id, userId);
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'delete studend from the course' })
  @ApiOkResponse({ description: 'The student has been successfully deleted from the course' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  @ApiNotFoundResponse({ description: 'Course or student not found' })
  @Delete(':id/users/:userId')
  deleteStudents(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.courseService.deleteStudents(id, userId);
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'delete course' })
  @ApiOkResponse({ description: 'The course has been successfully deleted' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @Delete(':id')
  deleteCourse(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.courseService.delete(id);
  }
}
