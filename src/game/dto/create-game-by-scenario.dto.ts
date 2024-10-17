import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from "mongodb";

export class CreateGameByScenarioDto {
  @ApiProperty({ description: 'ID of the user creating the game' })
  @IsString()
  userId: string;
}