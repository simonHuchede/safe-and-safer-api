import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('messages')
export class Message {
  @ApiProperty({ example: '60c72b2f9b1e8b6f7f3e3c9f', description: 'Unique identifier for the message' })
  @ObjectIdColumn()
  messageId: ObjectId;

  @ApiProperty({ example: 'john_doe', description: 'The sender of the message' })
  @Column()
  sender: string;

  @ApiProperty({ example: 'Hello, how are you?', description: 'The content of the message' })
  @Column()
  content: string;

  @ApiProperty({ example: 1, description: 'The number of the message to display in the conversation' })
  @Column()
  orderNumber: number;

  @ApiProperty({ example: '2024-10-14T10:00:00Z', description: 'The timestamp when the message was sent' })
  @Column()
  timestamp: Date;

  @ApiProperty({
    example: false,
    description: 'Indicates if the message is a threat or not',
  })
  @Column({ default: false })
  isThreat: boolean;

  @ApiProperty({ example: 'Harassment', description: 'Type of threat, if any', required: false })
  @Column({ nullable: true })
  threatType?: string;
}