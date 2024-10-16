import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";
import { Message } from '../../message/entities/message.entity';

@Entity('scenarios')
export class Scenario {
  @ObjectIdColumn()
  scenarioId: ObjectId;

  @Column(type => Message)
  messages: Message[];  // Les messages qui composent le scénario

  @Column()
  totalThreats: number;  // Nombre total de menaces dans le scénario

  @Column()
  completionTime: Date;  // Temps estimé pour compléter le scénario
}