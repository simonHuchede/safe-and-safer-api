import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioService } from './scenario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario } from './entities/scenario.entity';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { CreateMessageDto } from "../message/dto/create-message.dto";
import { ObjectId } from "mongodb";  // Assure-toi d'importer le DTO

describe('ScenarioService', () => {
  let service: ScenarioService;
  let scenarioRepository: jest.Mocked<Repository<Scenario>>;

  const mockScenarioRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScenarioService,
        {
          provide: getRepositoryToken(Scenario),
          useValue: mockScenarioRepository,  // Mock du repository Scenario
        },
      ],
    }).compile();

    service = module.get<ScenarioService>(ScenarioService) as ScenarioService;
    scenarioRepository = module.get<Repository<Scenario>>(getRepositoryToken(Scenario)) as jest.Mocked<Repository<Scenario>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new scenario', async () => {
    const createScenarioDto: CreateScenarioDto = {
      totalThreats: 3,
      messages: [
        {
          sender: 'Alex',
          orderNumber: 1,
          content: 'Test message',
          isThreat: true,
          threatType: 'harassment',
          timestamp: new Date(),
        },
      ],
      completionTime: new Date(),
    } as CreateScenarioDto;

    const mockScenario = { _id: new ObjectId('scenario123'), ...createScenarioDto } as Scenario;

    scenarioRepository.save.mockResolvedValue(mockScenario);

    const result = await service.create(createScenarioDto);
    expect(scenarioRepository.save).toHaveBeenCalledWith(createScenarioDto);
    expect(result).toEqual(mockScenario);
  });
});