import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { Score } from "./entities/score.entity";

@ApiTags('scores')
@ApiBearerAuth()
@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau score' })
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Post('bulk-create')
  @ApiOperation({ summary: 'Create multiple scores' })
  createBulk(@Body() createScoresDto: CreateScoreDto[]): Promise<Score[]> {
    return this.scoreService.createBulk(createScoresDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les scores' })
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un score par son ID' })
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Find score by user ID' })
  findOneByUserId(@Param('userId') userId: string): Promise<Score> {
    return this.scoreService.findOneByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un score par son ID' })
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(id, updateScoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un score par son ID' })
  remove(@Param('id') id: string) {
    return this.scoreService.remove(id);
  }
}