import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ILoginUser } from '../interfaces/ILoginUser';

export class LoginUserDto implements ILoginUser {
  @ApiProperty({ type: String, description: "User's email", example: 'test@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String, description: "User's password", example: 'test1234' })
  @IsString()
  readonly password: string;
}
