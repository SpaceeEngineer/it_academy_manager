import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { ISendEmail } from '../interfaces/ISendEmail';

export class SendEmailDto implements ISendEmail {
  @IsEmail()
  @ApiProperty({ type: String, description: "User's email", example: 'test@gmail.com' })
  email: string;
}
