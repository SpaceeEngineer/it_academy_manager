import { IsDateString, IsString, Length, IsNumber } from 'class-validator';
import { ILesson } from '../interfaces/ILesson';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto implements ILesson {
  @ApiProperty({ type: String, description: 'The title of the lesson', example: 'Some title' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ type: String, description: 'Lecturer name', example: 'Top lecturer' })
  @IsString()
  @Length(1, 255)
  lecturer: string;

  @ApiProperty({ type: Number, description: 'Course id', example: 13 })
  @IsNumber()
  courseId: number;

  @ApiProperty({ type: Date, description: 'Date of the lesson', example: '2023-01-01 16:30:00' })
  @IsDateString()
  dateAndTime: Date;

  @ApiProperty({ type: String, description: "Lesson's link", example: 'Some link' })
  @IsString()
  @Length(1, 255)
  link: string;

  @ApiProperty({ type: String, description: 'Homework', example: "Some task's" })
  @IsString()
  @Length(1, 600)
  homeTaskDescription: string;
}
