import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @ApiProperty({ description: 'Propriétés mises à jour pour le message', required: false })
  updatedProps?: Partial<CreateMessageDto>;
}