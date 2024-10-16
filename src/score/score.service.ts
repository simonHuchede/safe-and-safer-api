import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from "typeorm";
import { Score } from './entities/score.entity';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  // Créer un nouveau score
  async create(createScoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoreRepository.create(createScoreDto);
    return this.scoreRepository.save(score);
  }

  async createBulk(createScoresDto: CreateScoreDto[]): Promise<Score[]> {
    const scores = this.scoreRepository.create(createScoresDto);
    return this.scoreRepository.save(scores);
  }

  // Récupérer tous les scores
  async findAll(): Promise<Score[]> {
    return this.scoreRepository.find();
  }

  // Récupérer un score par son ID
  async findOne(id: string): Promise<Score> {
    const objectId = new ObjectId(id);
    const score = await this.scoreRepository.findOneBy({ _id: objectId });
    if (!score) {
      throw new NotFoundException(`Score #${id} not found`);
    }
    return score;
  }

  // Mise à jour partielle d'un score avec PATCH
  async update(id: string, updateScoreDto: UpdateScoreDto): Promise<Score> {
    const score = await this.findOne(id);
    Object.assign(score, updateScoreDto);
    return this.scoreRepository.save(score);
  }

  // Supprimer un score
  async remove(id: string): Promise<void> {
    const result = await this.scoreRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Score #${id} not found`);
    }
  }
}