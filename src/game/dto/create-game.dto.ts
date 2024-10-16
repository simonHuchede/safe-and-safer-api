import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateScenarioDto } from '../../scenario/dto/create-scenario.dto';
import { CreateMessageDto } from '../../message/dto/create-message.dto';

export class CreateGameDto {
  @ApiProperty({ description: "ID de l'utilisateur jouant le jeu" })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Scénario joué dans cette partie' })
  @ValidateNested()
  @Type(() => CreateScenarioDto)
  scenario: CreateScenarioDto;

  @ApiProperty({ description: 'Messages identifiés comme des menaces par le joueur', type: [CreateMessageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMessageDto)
  identifiedThreats: CreateMessageDto[];

  @ApiProperty({
    description:
      "Messages manqués que le joueur n'a pas identifiés comme des menaces",
    type: [CreateMessageDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMessageDto)
  missedThreats: CreateMessageDto[];

  @ApiProperty({ description: 'Nombre de menaces identifiées correctement' })
  @IsNumber()
  threatsIdentified: number;

  @ApiProperty({ description: 'Score obtenu pour cette partie' })
  @IsNumber()
  score: number;
}