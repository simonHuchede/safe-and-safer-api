import { PartialType } from '@nestjs/mapped-types';
import { CreateScenarioDto } from './create-scenario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScenarioDto extends PartialType(CreateScenarioDto) {
  @ApiProperty({
    description: 'Propriétés mises à jour pour le scénario',
    required: false,
  })
  updatedProps?: Partial<CreateScenarioDto>;
}