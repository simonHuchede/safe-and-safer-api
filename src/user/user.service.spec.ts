import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from "mongodb";

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<Repository<User>>;

  const mockUserRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,  // Mock du repository User
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService) as UserService;
    userRepository = module.get<Repository<User>>(getRepositoryToken(User)) as jest.Mocked<Repository<User>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = { _id: new ObjectId('user123'), ...createUserDto } as User;

    userRepository.save.mockResolvedValue(mockUser);

    const result = await service.create(createUserDto);
    expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual(mockUser);
  });

  it('should find a user by id', async () => {
    const userId = 'user123';
    const mockUser = { _id: new ObjectId(userId), username: 'testUser', email: 'test@example.com' , password: 'password1234'} as User;

    userRepository.findOneBy.mockResolvedValue(mockUser);

    const result = await service.findOne(userId);
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ _id: userId });
    expect(result).toEqual(mockUser);
  });

  it('should return all users', async () => {
    const mockUsers = [
      { _id: 'user123', username: 'testUser1', email: 'test1@example.com' , password: 'password123' } as User,
      { _id: 'user456', username: 'testUser2', email: 'test2@example.com' , password: 'password123' } as User,
    ] as unknown as User[];

    userRepository.find.mockResolvedValue(mockUsers);

    const result = await service.findAll();
    expect(userRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });
});