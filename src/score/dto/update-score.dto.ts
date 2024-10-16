import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreDto } from './create-score.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScoreDto extends PartialType(CreateScoreDto) {
  @ApiProperty({
    description: 'Propriétés mises à jour pour le score',
    required: false
  })
  updatedProps?: Partial<CreateScoreDto>;
}