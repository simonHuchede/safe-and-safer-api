import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from "typeorm";
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ScenarioService } from "../scenario/scenario.service";
import { UserService } from "../user/user.service";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly scenarioService: ScenarioService,
    private readonly userService: UserService,
  ) {}


  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async createBulk(createGamesDto: CreateGameDto[]): Promise<Game[]> {
    const games = this.gameRepository.create(createGamesDto);
    return this.gameRepository.save(games);
  }

  async createByScenarioId(userId: string, scenarioId: string): Promise<Game> {
    const scenario = await this.scenarioService.findOne(scenarioId);
    const user = await this.userService.findOne(userId);
    if (!scenario) {
      throw new NotFoundException(`Scenario with ID ${scenarioId} not found`);
    }
    if (!user) {
      throw new NotFoundException(`Scenario with ID ${userId} not found`);
    }
    const newGame = this.gameRepository.create({
      userId,
      scenario,
      identifiedThreats: [],
      missedThreats: [],
      threatsIdentified: 0,
      score: 0,
    });

    return this.gameRepository.save(newGame);
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findOne(id: string): Promise<Game> {
    const objectId = new ObjectId(id);
    const game = await this.gameRepository.findOneBy({ _id: objectId });
    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }
    return game;
  }

  async findOneByUserId(userId: string): Promise<Game> {
    const game = await this.gameRepository.findOneBy({ userId });

    if (!game) {
      throw new NotFoundException(`Game for user ${userId} not found`);
    }
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    Object.assign(game, updateGameDto);
    return this.gameRepository.save(game);
  }

  async remove(id: string): Promise<void> {
    const result = await this.gameRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Game #${id} not found`);
    }
  }
}