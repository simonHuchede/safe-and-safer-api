import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @ApiProperty({ description: 'Propriétés mises à jour pour la partie', required: false })
  updatedProps?: Partial<CreateGameDto>;
}