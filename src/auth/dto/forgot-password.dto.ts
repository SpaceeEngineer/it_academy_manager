import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ type: String, description: "User's email", example: 'test@gmail.com' })
  @IsEmail()
  email: string;
}
