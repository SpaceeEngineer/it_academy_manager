import { IsString, IsNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IChangePassword } from '../interfaces/IChangePassword';

export class ChangePasswordDto implements IChangePassword {
  @IsNumber()
  @ApiProperty({ type: Number, description: "User's id", example: '777' })
  readonly id: number;

  @IsString()
  @Length(5, 255)
  @ApiProperty({ type: String, description: "User's new password", example: 'New password' })
  readonly newPassword: string;

  @IsString()
  @ApiProperty({ type: String, description: "User's old password", example: 'Old password' })
  readonly oldPassword: string;
}
