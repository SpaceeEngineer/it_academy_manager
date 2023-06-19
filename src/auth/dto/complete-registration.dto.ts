import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsJWT, IsMobilePhone, IsString, Length } from 'class-validator';
import { ICompleteRegistration } from '../interfaces/ICompleteRegistration';

export class CompleteRegistrationDto implements ICompleteRegistration {
  @IsJWT()
  @ApiProperty({ type: String, description: 'Token', example: 'token' })
  token: string;

  @IsMobilePhone()
  @ApiProperty({ type: String, description: "User's phone number", example: '+380502292777' })
  telephone: string;

  @Length(8, 255)
  @IsString()
  @ApiProperty({ type: String, description: "User's password", example: 'greatPassword' })
  password: string;

  @Length(8, 255)
  @IsString()
  @ApiProperty({ type: String, description: 'Confirm password', example: 'greatPassword' })
  passwordConfirm: string;

  @IsString()
  @Length(2, 64)
  @ApiProperty({ type: String, description: "User's city of residence", example: 'Lviv' })
  city: string;

  @IsDateString()
  @ApiProperty({ type: Date, description: "User's date of birth", example: '2000-01-30' })
  dob: Date;
}
