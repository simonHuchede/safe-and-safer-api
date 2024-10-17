import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Scenario } from './entities/scenario.entity';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

@Injectable()
export class ScenarioService {
  constructor(
    @InjectRepository(Scenario)
    private readonly scenarioRepository: Repository<Scenario>,
  ) {}

  async create(createScenarioDto: CreateScenarioDto): Promise<Scenario> {
    const messagesWithIds = createScenarioDto.messages.map((message) => ({
      ...message,
      messageId: new ObjectId(),
    }));
    const scenario = this.scenarioRepository.create({
      ...createScenarioDto,
      messages: messagesWithIds,
    });
    return this.scenarioRepository.save(scenario);
  }

  async createBulk(
    createScenariosDto: CreateScenarioDto[],
  ): Promise<Scenario[]> {
    const scenariosWithIds = createScenariosDto.map((scenarioDto) => {
      const messagesWithIds = scenarioDto.messages.map((message) => ({
        ...message,
        messageId: new ObjectId(),
      }));

      return {
        ...scenarioDto,
        messages: messagesWithIds,
      };
    });

    const scenarios = this.scenarioRepository.create(scenariosWithIds);
    return this.scenarioRepository.save(scenarios);
  }

  async findAll(): Promise<Scenario[]> {
    return this.scenarioRepository.find();
  }

  async findOne(id: string): Promise<Scenario> {
    const objectId = new ObjectId(id);
    return this.scenarioRepository.findOneBy({_id: objectId});
  }

  async update(
    id: string,
    updateScenarioDto: UpdateScenarioDto,
  ): Promise<Scenario> {
    const scenario = await this.findOne(id);
    Object.assign(scenario, updateScenarioDto);
    return this.scenarioRepository.save(scenario);
  }

  async remove(id: string): Promise<void> {
    const result = await this.scenarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Scenario #${id} not found`);
    }
  }
}
