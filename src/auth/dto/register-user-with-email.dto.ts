import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { ICreateUserPartially } from '../../users/interfaces/ICreateUserPartially';

export class RegisterUserWithEmailDto implements ICreateUserPartially {
  @IsString()
  @Length(3, 64)
  @ApiProperty({ type: String, description: "User's firstname", example: 'John' })
  firstName: string;

  @IsString()
  @Length(3, 64)
  @ApiProperty({ type: String, description: "User's lastname", example: 'Smith' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ type: String, description: "User's email", example: 'test@gmail.com' })
  email: string;
}
