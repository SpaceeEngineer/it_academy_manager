import {
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsString,
  Length,
  IsNumber,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUser } from '../interfaces/ICreateUser';

export class CreateUserDto implements ICreateUser {
  @ApiProperty({ type: String, description: "User's city", example: 'Lviv' })
  @IsString()
  @Length(2, 64)
  city: string;

  @ApiProperty({ type: Date, description: "User's date of birth", example: '1990-01-01' })
  @IsDateString()
  dob: Date;

  @ApiProperty({ type: String, description: "User's email", example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: "User's password", example: 'Super password' })
  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty({ type: String, description: "User's firstname", example: 'Petro' })
  @IsString()
  @Length(3, 64)
  firstName: string;

  @ApiProperty({ type: String, description: "User's lastname", example: 'Poroshenko' })
  @IsString()
  @Length(3, 64)
  lastName: string;

  @ApiProperty({ type: String, description: "User's account status", example: 'active' })
  @IsString()
  @Length(3, 64)
  accouuntStatus: string;

  @ApiProperty({ type: String, description: "User's phone number", example: '0501234567' })
  @IsMobilePhone()
  telephone: string;

  @ApiProperty({ type: Number, description: "User's role id", default: 2 })
  @IsNumber()
  roleId: number;
}
