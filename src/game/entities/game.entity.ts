import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectId } from "typeorm";
import { Scenario } from '../../scenario/entities/scenario.entity';
import { Message } from '../../message/entities/message.entity';

@Entity('games')
export class Game {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column(type => Scenario)
  scenario: Scenario;  // Le scénario joué par l'utilisateur

  @Column(type => Message)
  identifiedThreats: Message[];  // Messages identifiés comme menaces par le joueur

  @Column(type => Message)
  missedThreats: Message[];  // Messages de menace que le joueur a manqué

  @Column()
  threatsIdentified: number;  // Nombre de menaces identifiées par le joueur dans cette partie

  @Column()
  score: number;  // Score obtenu par le joueur dans cette partie

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}