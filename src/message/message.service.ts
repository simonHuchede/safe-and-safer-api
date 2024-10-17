import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async createBulk(createMessagesDto: CreateMessageDto[]): Promise<Message[]> {
    const messages = this.messageRepository.create(createMessagesDto);
    return this.messageRepository.save(messages);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async findOne(id: string): Promise<Message> {
    const objectId = new ObjectId(id);
    const message = await this.messageRepository.findOneBy({ _id: objectId });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.findOne(id);
    Object.assign(message, updateMessageDto);
    return this.messageRepository.save(message);
  }

  async remove(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    const result = await this.messageRepository.delete({ _id: objectId });
    if (result.affected === 0) {
      throw new NotFoundException(`Message #${id} not found`);
    }
  }
}