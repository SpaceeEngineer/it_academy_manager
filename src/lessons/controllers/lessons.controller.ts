import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Inject,
  Param,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { EditLessonDto } from '../dto/edit-lesson.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { LESSON_SERVICE } from 'src/shared/constants/serviceConstants';
import { ILessonService } from '../interfaces/ILessonService';
import { ILesson } from '../interfaces/ILesson';
import { Roles } from 'src/roles/roles.auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ILessonInfo } from '../interfaces/ILessonInfo';
import { RoleEnum } from 'src/roles/roles.enum';

@UseGuards(JwtAuthGuard)
@Controller('lessons')
@ApiTags('Lessons')
@ApiSecurity('JWT-auth')
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class LessonsController {
  constructor(
    @Inject(LESSON_SERVICE)
    private readonly lessonsService: ILessonService,
  ) {}

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @ApiBody({ type: CreateLessonDto })
  @ApiOperation({ summary: 'create lesson' })
  @ApiCreatedResponse({ description: 'The lesson has been successfully created' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post()
  create(@Body() createLessonDto: CreateLessonDto): Promise<ILesson> {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiOperation({ summary: 'get all lessons' })
  @ApiOkResponse({ description: 'The list of lessons has been successfully returned' })
  @Get()
  findAll(): Promise<ILesson[]> {
    return this.lessonsService.findAll();
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @ApiBody({ type: EditLessonDto })
  @ApiOperation({ summary: 'update lesson' })
  @ApiOkResponse({ description: 'The lesson has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Lesson not found' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Patch(':id')
  updateLesson(
    @Param('id', ParseIntPipe) id: number,
    @Body() editLesson: EditLessonDto,
  ): Promise<boolean> {
    return this.lessonsService.update(id, editLesson);
  }

  @ApiOperation({ summary: 'get lesson by id' })
  @ApiOkResponse({ description: 'The lesson has been successfully returned' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  @ApiNotFoundResponse({ description: 'Lesson not found' })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<ILessonInfo> {
    return this.lessonsService.findOneWithRoleCheck(id);
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'delete lesson' })
  @ApiOkResponse({ description: 'The lesson has been successfully deleted' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  @ApiNotFoundResponse({ description: 'Lesson not found' })
  @Delete(':id')
  deleteLesson(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.lessonsService.delete(id);
  }
}
