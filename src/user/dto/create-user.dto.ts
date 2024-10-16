import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)  // Assure que le mot de passe fait au moins 6 caractères
  password: string;
}