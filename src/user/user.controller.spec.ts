import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  const mockUserService = {
    create: jest.fn(),
    findOneById: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,  // Mock du UserService
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController) as UserController;
    service = module.get<UserService>(UserService) as jest.Mocked<UserService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = { _id: 'user123', ...createUserDto };

    service.create.mockResolvedValueOnce(mockUser);

    const result = await controller.create(createUserDto);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual(mockUser);
  });

  it('should find a user by id', async () => {
    const userId = 'user123';
    const mockUser = { _id: userId, username: 'testUser', email: 'test@example.com' , password: 'password123' } as UserService;

    service.findOneById.mockResolvedValueOnce(mockUser);

    const result = await controller.findOne(userId);
    expect(service.findOneById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
  });

  it('should return all users', async () => {
    const mockUsers = [
      { _id: 'user123', username: 'testUser1', email: 'test1@example.com', password: 'password123' },
      { _id: 'user456', username: 'testUser2', email: 'test2@example.com', password: 'password123' },
    ];

    service.findAll.mockResolvedValueOnce(mockUsers);

    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });
});