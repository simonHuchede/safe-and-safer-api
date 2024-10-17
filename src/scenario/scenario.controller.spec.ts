import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioController } from './scenario.controller';
import { ScenarioService } from './scenario.service';

describe('ScenarioController', () => {
  let controller: ScenarioController;
  let service: jest.Mocked<ScenarioService>;

  const mockScenarioService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScenarioController],
      providers: [
        {
          provide: ScenarioService,
          useValue: mockScenarioService,  // Mock du ScenarioService
        },
      ],
    }).compile();

    controller = module.get<ScenarioController>(ScenarioController) as ScenarioController;
    service = module.get<ScenarioService>(ScenarioService) as jest.Mocked<ScenarioService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ScenarioService.findOne', async () => {
    const scenarioId = 'scenario123scenario123';
    service.findOne.mockResolvedValueOnce({
      scenarioId,
      totalThreats: 3,
    } as any);  // Mocked Scenario object

    await controller.findOne(scenarioId);
    expect(service.findOne).toHaveBeenCalledWith(scenarioId);
  });

  it('should call ScenarioService.findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});