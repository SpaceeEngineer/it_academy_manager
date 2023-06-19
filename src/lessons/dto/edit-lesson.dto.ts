import { PartialType } from '@nestjs/mapped-types';
import { IEditLesson } from '../interfaces/IEditLesson';
import { CreateLessonDto } from './create-lesson.dto';

export class EditLessonDto extends PartialType(CreateLessonDto) implements IEditLesson {}
