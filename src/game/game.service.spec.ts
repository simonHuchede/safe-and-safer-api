import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { ScenarioService } from '../scenario/scenario.service';
import { Scenario } from '../scenario/entities/scenario.entity';
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { ObjectId } from "mongodb";

describe('GameService', () => {
  let service: GameService;
  let gameRepository: jest.Mocked<Repository<Game>>;  // On spécifie clairement le type Mocked Repository
  let scenarioService: jest.Mocked<ScenarioService>;  // On spécifie clairement le type Mocked ScenarioService
  let userService: jest.Mocked<UserService>;  // On spécifie clairement le type Mocked ScenarioService

  const mockGameRepository = {
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockScenarioService = {
    findOne: jest.fn(),
  };

  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockGameRepository,  // Fournit le mock du repository Game
        },
        {
          provide: ScenarioService,
          useValue: mockScenarioService,  // Fournit le mock du ScenarioService
        },
        {
          provide: UserService,
          useValue: mockUserService,  // Fournit le mock du ScenarioService
        },
      ],
    }).compile();

    // Injection des dépendances avec les bons types
    service = module.get<GameService>(GameService) as GameService;
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game)) as jest.Mocked<Repository<Game>>;
    scenarioService = module.get<ScenarioService>(ScenarioService) as jest.Mocked<ScenarioService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a game by scenarioId', async () => {
    const scenarioId = 'scenario123';
    const userId = new ObjectId('user123');
    const mockScenario = { scenarioId, totalThreats: 3 } as unknown as Scenario;
    const mockUser = { userId, username: 'simon', email: 'simon.huchede@gmail.com', password: 'password123'} as unknown as User;
    const mockGame = { userId, scenario: mockScenario, score: 0 } as Game;

    // Mock des appels
    scenarioService.findOne.mockResolvedValue(mockScenario);
    userService.findOne.mockResolvedValue(mockUser);
    gameRepository.save.mockResolvedValue(mockGame);

    const result = await service.createByScenarioId(userId, scenarioId);

    expect(scenarioService.findOne).toHaveBeenCalledWith(scenarioId);
    expect(gameRepository.save).toHaveBeenCalledWith({
      userId,
      scenario: mockScenario,
      identifiedThreats: [],
      missedThreats: [],
      threatsIdentified: 0,
      score: 0,
    });
    expect(result).toEqual(mockGame);
  });

  it('should find a game by userId', async () => {
    const userId = 'user123';
    const mockGame = { userId, score: 100 } as Game;

    gameRepository.findOneBy.mockResolvedValue(mockGame);

    const result = await service.findOneByUserId(userId);

    expect(gameRepository.findOneBy).toHaveBeenCalledWith({ userId });
    expect(result).toEqual(mockGame);
  });
});