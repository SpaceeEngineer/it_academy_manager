import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ type: String, description: 'Token', example: 'token' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ type: String, description: "User's password", example: 'Super password' })
  @Length(8, 255)
  @IsString()
  password: string;

  @ApiProperty({ type: String, description: 'Confirm password', example: 'Confirm super password' })
  @Length(8, 255)
  @IsString()
  passwordConfirm: string;
}
