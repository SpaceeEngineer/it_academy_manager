import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class EditUserProfileDto extends PartialType(CreateUserDto) {
  @IsEmpty()
  @IsNotIn([''])
  @ApiProperty({ type: String, description: "Edit user's password", example: 'Super password' })
  password: string;

  @IsEmpty()
  @IsNotIn([''])
  @ApiProperty({ type: String, description: "Edit user's account status", example: 'active' })
  accouuntStatus: string;

  @IsEmpty()
  @ApiProperty({ type: Number, description: "Edit user's role id", default: 2 })
  roleId: number;
}
