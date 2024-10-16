import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from "typeorm";
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  // Créer une nouvelle partie (Game)
  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async createBulk(createGamesDto: CreateGameDto[]): Promise<Game[]> {
    const games = this.gameRepository.create(createGamesDto);
    return this.gameRepository.save(games);
  }

  // Récupérer toutes les parties (Games)
  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  // Récupérer une partie par son ID
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

  // Mettre à jour une partie (Game) partiellement avec PATCH
  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    Object.assign(game, updateGameDto);
    return this.gameRepository.save(game);
  }

  // Supprimer une partie (Game) par son ID
  async remove(id: string): Promise<void> {
    const result = await this.gameRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Game #${id} not found`);
    }
  }
}