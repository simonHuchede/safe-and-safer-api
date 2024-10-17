import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'john_doe_updated', description: 'The updated username of the user', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'john.doe_updated@example.com', description: 'The updated email address of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'newSecurePassword123', description: 'The updated password of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}