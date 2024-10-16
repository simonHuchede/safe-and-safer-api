import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
@Entity('messages')
export class Message {
  @ObjectIdColumn()
  messageId: ObjectId;

  @Column()
  sender: string;

  @Column()
  content: string;

  @Column()
  timestamp: Date;

  @Column({ default: false })
  isThreat: boolean;  // Indique si le message est une menace

  @Column({ nullable: true })
  threatType?: string;  // Type de menace, s'il y en a
}