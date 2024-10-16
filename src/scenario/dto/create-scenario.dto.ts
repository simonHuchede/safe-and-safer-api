import { IsString, IsArray, IsNumber, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMessageDto } from '../../message/dto/create-message.dto';

export class CreateScenarioDto {

  @ApiProperty({ description: 'Liste des messages associés au scénario', type: [CreateMessageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMessageDto)
  messages: CreateMessageDto[];

  @ApiProperty({ description: 'Nombre total de menaces dans le scénario' })
  @IsNumber()
  totalThreats: number;

  @ApiProperty({ description: 'Durée de complétion estimée du scénario' })
  @IsDateString()
  completionTime: string;
}