import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectId } from "typeorm";
import { Game } from '../../game/entities/game.entity';

@Entity('scores')
export class Score {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;  // Identifiant de l'utilisateur

  @Column(type => Game)
  games: Game[];  // Liste des parties jouées par l'utilisateur

  @Column()
  totalScore: number;  // Score total de l'utilisateur basé sur ses parties

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}