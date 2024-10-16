import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from "typeorm";
import { Scenario } from './entities/scenario.entity';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

@Injectable()
export class ScenarioService {
  constructor(
    @InjectRepository(Scenario)
    private readonly scenarioRepository: Repository<Scenario>,
  ) {}

  // Créer un nouveau scénario
  async create(createScenarioDto: CreateScenarioDto): Promise<Scenario> {
    const scenario = this.scenarioRepository.create(createScenarioDto);
    return this.scenarioRepository.save(scenario);
  }

  // Récupérer tous les scénarios
  async findAll(): Promise<Scenario[]> {
    return this.scenarioRepository.find();
  }

  // Récupérer un scénario par son ID
  async findOne(id: string): Promise<Scenario> {
    const objectId = new ObjectId(id);
    const scenario = await this.scenarioRepository.findOneBy({ scenarioId: objectId });
    if (!scenario) {
      throw new NotFoundException(`Scenario #${id} not found`);
    }
    return scenario;
  }

  // Mise à jour partielle d'un scénario avec PATCH
  async update(id: string, updateScenarioDto: UpdateScenarioDto): Promise<Scenario> {
    const scenario = await this.findOne(id);
    Object.assign(scenario, updateScenarioDto);
    return this.scenarioRepository.save(scenario);
  }

  // Supprimer un scénario
  async remove(id: string): Promise<void> {
    const result = await this.scenarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Scenario #${id} not found`);
    }
  }
}