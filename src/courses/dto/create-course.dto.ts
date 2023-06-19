import { IsDateString, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICourse } from '../interfaces/ICourse';
import { StatusEnum } from '../status.enum';

export class CreateCourseDto implements ICourse {
  @ApiProperty({ type: String, description: 'The title of the course', example: 'Some title' })
  @IsString()
  @Length(3)
  title: string;

  @ApiProperty({ type: Date, description: 'Start date of the course', example: '2023-01-01' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ type: Date, description: 'End date of the course', example: '2023-01-01' })
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @ApiProperty({ enum: StatusEnum, description: 'Status of the course', default: 'active' })
  @IsString()
  status: StatusEnum;
}
