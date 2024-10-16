import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGameDto } from '../../game/dto/create-game.dto';

export class CreateScoreDto {
  @ApiProperty({ description: 'ID de l\'utilisateur auquel le score est associé' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Liste des parties jouées', type: [CreateGameDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGameDto)
  games: CreateGameDto[];

  @ApiProperty({ description: 'Score total de l\'utilisateur basé sur ses parties' })
  @IsNumber()
  totalScore: number;
}