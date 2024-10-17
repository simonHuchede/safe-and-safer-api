import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { ObjectId } from "mongodb";

describe('MessageService', () => {
  let service: MessageService;
  let messageRepository: jest.Mocked<Repository<Message>>;

  const mockMessageRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,  // Mock du repository Message
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService) as MessageService;
    messageRepository = module.get<Repository<Message>>(getRepositoryToken(Message)) as jest.Mocked<Repository<Message>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new message', async () => {
    const createMessageDto: CreateMessageDto = {
      sender: 'Alex',
      content: 'Test message',
      orderNumber: 1,
      timestamp: 'new Date()',
      isThreat: true,
    } as CreateMessageDto;

    const mockMessage = {
      _id: new ObjectId('message123'),
      ...createMessageDto,
    } as Message;

    messageRepository.save.mockResolvedValue(mockMessage);

    const result = await service.create(createMessageDto);
    expect(messageRepository.save).toHaveBeenCalledWith(expect.objectContaining(createMessageDto));
    expect(result).toEqual(mockMessage);
  });
});