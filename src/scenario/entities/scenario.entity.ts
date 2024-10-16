import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Message } from '../../message/entities/message.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('scenarios')
export class Scenario {
  @ApiProperty({ example: '60c72b2f9b1e8b6f7f3e3c9f', description: 'Unique identifier for the scenario' })
  @ObjectIdColumn()
  scenarioId: ObjectId;

  @ApiProperty({
    description: 'List of messages that make up the scenario',
    type: [Message],
  })
  @Column({ type: 'array' })
  messages: Message[];

  @ApiProperty({
    example: 5,
    description: 'Total number of threats in the scenario',
  })
  @Column()
  totalThreats: number;

  @ApiProperty({ example: '2024-10-14T10:20:00Z', description: 'Estimated time to complete the scenario' })
  @Column()
  completionTime: Date;  // Temps estimé pour compléter le scénario
}