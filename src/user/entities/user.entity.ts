import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: '60c72b2f9b1e8b6f7f3e3c9f', description: 'The unique identifier for the user' })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @Column()
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
  @Column()
  email: string;

  @ApiProperty({ example: 'hashedpassword123', description: 'The hashed password of the user', writeOnly: true })
  @Column()
  password: string;  // Le mot de passe sera hashé, pas stocké en clair
}