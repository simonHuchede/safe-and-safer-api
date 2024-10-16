import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectId } from 'typeorm';
import { Scenario } from '../../scenario/entities/scenario.entity';
import { Message } from '../../message/entities/message.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('games')
export class Game {
  @ApiProperty({ example: '60c72b2f9b1e8b6f7f3e3c9f', description: 'Unique identifier for the game' })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({ example: 'user123', description: 'ID of the user who played the game' })
  @Column()
  userId: string;

  @ApiProperty({ description: 'The scenario played by the user', type: () => Scenario })
  @Column(type => Scenario)
  scenario: Scenario;  // Le scénario joué par l'utilisateur

  @ApiProperty({ description: 'List of threats identified during the game', type: [Message] })
  @Column(type => Message)
  identifiedThreats: Message[];  // Messages identifiés comme menaces par le joueur

  @ApiProperty({ description: 'List of threats missed by the player during the game', type: [Message] })
  @Column(type => Message)
  missedThreats: Message[];  // Messages de menace que le joueur a manqué

  @ApiProperty({ example: 3, description: 'Number of threats identified by the player during the game' })
  @Column()
  threatsIdentified: number;  // Nombre de menaces identifiées par le joueur dans cette partie

  @ApiProperty({ example: 85, description: 'The score obtained by the player during the game' })
  @Column()
  score: number;  // Score obtenu par le joueur dans cette partie

  @ApiProperty({ description: 'The date when the game was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the game was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}