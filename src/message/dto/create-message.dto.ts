import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {

  @ApiProperty({ description: 'Expéditeur du message' })
  @IsString()
  sender: string;

  @ApiProperty({ description: 'Contenu du message' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Horodatage du message' })
  @IsDateString()
  timestamp: string;

  @ApiProperty({ description: 'Le message est-il une menace ?', default: false })
  @IsBoolean()
  isThreat: boolean;

  @ApiProperty({ description: 'Type de menace (s\'il y en a)', required: false })
  @IsOptional()
  @IsString()
  threatType?: string;
}