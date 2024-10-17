import { Test, TestingModule } from '@nestjs/testing';
import { ScoreService } from './score.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { CreateGameDto } from '../game/dto/create-game.dto';
import { CreateScoreDto } from "./dto/create-score.dto";
import { ObjectId } from "mongodb";
import { Game } from "../game/entities/game.entity";  // Importe le DTO pour les games

describe('ScoreService', () => {
  let service: ScoreService;
  let scoreRepository: jest.Mocked<Repository<Score>>;

  const mockScoreRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoreService,
        {
          provide: getRepositoryToken(Score),
          useValue: mockScoreRepository,  // Mock du repository Score
        },
      ],
    }).compile();

    service = module.get<ScoreService>(ScoreService) as ScoreService;
    scoreRepository = module.get<Repository<Score>>(getRepositoryToken(Score)) as jest.Mocked<Repository<Score>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a score by userId', async () => {
    const userId = 'user123';
    const mockScore = { userId, totalScore: 100, createdAt: new Date(), updatedAt: new Date() } as Score;

    scoreRepository.findOneBy.mockResolvedValue(mockScore);

    const result = await service.findOneByUserId(userId);
    expect(scoreRepository.findOneBy).toHaveBeenCalledWith({ userId });
    expect(result).toEqual(mockScore);
  });

  it('should create a new score', async () => {
    const createScoreDto = { userId: 'user123', games: [] as Game[], totalScore: 100 } as unknown as CreateScoreDto;
    const mockScore = {
      ...createScoreDto,
      _id: new ObjectId('score123'),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Score;

    scoreRepository.save.mockResolvedValue(mockScore);

    const result = await service.create(createScoreDto);
    expect(scoreRepository.save).toHaveBeenCalledWith(createScoreDto);
    expect(result).toEqual(mockScore);
  });
});