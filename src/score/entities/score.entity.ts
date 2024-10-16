import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectId } from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('scores')
export class Score {
  @ApiProperty({ example: '60c72b2f9b1e8b6f7f3e3c9f', description: 'Unique identifier for the score' })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({ example: 'user123', description: 'ID of the user to whom the score belongs' })
  @Column()
  userId: string;  // Identifiant de l'utilisateur

  @ApiProperty({ description: 'List of games played by the user', type: [Game] })
  @Column(type => Game)
  games: Game[];  // Liste des parties jouées par l'utilisateur

  @ApiProperty({ example: 250, description: 'Total score of the user based on games played' })
  @Column()
  totalScore: number;  // Score total de l'utilisateur basé sur ses parties

  @ApiProperty({ description: 'The date when the score was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the score was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}