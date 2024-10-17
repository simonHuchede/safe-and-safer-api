import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CreateMessageDto } from "./dto/create-message.dto";

describe('MessageController', () => {
  let controller: MessageController;
  let service: jest.Mocked<MessageService>;

  const mockMessageService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService,  // Mock du MessageService
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController) as MessageController;
    service = module.get<MessageService>(MessageService) as jest.Mocked<MessageService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call MessageService.findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call MessageService.create', async () => {
    const dto = { sender: 'Alex', content: 'Test message' } as CreateMessageDto;
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});