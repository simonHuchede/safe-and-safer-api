import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

describe('ScoreController', () => {
  let controller: ScoreController;
  let service: jest.Mocked<ScoreService>;

  const mockScoreService = {
    findOneByUserId: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [
        {
          provide: ScoreService,
          useValue: mockScoreService,  // Mock du ScoreService
        },
      ],
    }).compile();

    controller = module.get<ScoreController>(ScoreController) as ScoreController;
    service = module.get<ScoreService>(ScoreService) as jest.Mocked<ScoreService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ScoreService.findOneByUserId', async () => {
    const userId = 'user123';
    service.findOneByUserId.mockResolvedValueOnce({
      userId,
      totalScore: 100,
    } as any);  // Mocked Score object

    await controller.findOneByUserId(userId);
    expect(service.findOneByUserId).toHaveBeenCalledWith(userId);
  });

  it('should call ScoreService.findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});