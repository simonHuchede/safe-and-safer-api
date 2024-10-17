import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('GameController', () => {
  let controller: GameController;
  let service: jest.Mocked<GameService>;

  const mockGameService = {
    findAll: jest.fn(),
    findOneByUserId: jest.fn(),
    createByScenarioId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: mockGameService,
        },
      ],
    }).compile();
    controller = module.get<GameController>(GameController) as GameController;
    service = module.get<GameService>(GameService) as jest.Mocked<GameService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call GameService.findOneByUserId', async () => {
    const userId = 'user1234567890&azertyuio';
    service.findOneByUserId.mockResolvedValueOnce({
      userId,
      score: 50,
      scenario: { scenarioId: 'scenario123scenario123', totalThreats: 3 },
    } as any);  // Mocked Game object

    await controller.findOneByUserId(userId);
    expect(service.findOneByUserId).toHaveBeenCalledWith(userId);
  });

  it('should call GameService.createByScenarioId', async () => {
    const scenarioId = 'scenario123scenario123';
    const userId = 'user1234567890&azertyuio';
    service.createByScenarioId.mockResolvedValueOnce({
      userId,
      scenario: { scenarioId, totalThreats: 3 },
      score: 0,
    } as any);  // Mocked Game object

    await controller.createByScenarioId(scenarioId, { userId });
    expect(service.createByScenarioId).toHaveBeenCalledWith(userId, scenarioId);
  });
});


