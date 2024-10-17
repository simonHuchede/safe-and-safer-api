import { Controller, Get, Post, Patch, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Game } from "./entities/game.entity";
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGameByScenarioDto } from "./dto/create-game-by-scenario.dto";

@ApiTags('games')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle partie (game)' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @UseGuards(AuthGuard)
  @Post('bulk-create')
  @ApiOperation({ summary: 'Create multiple games' })
  createBulk(@Body() createGamesDto: CreateGameDto[]): Promise<Game[]> {
    return this.gameService.createBulk(createGamesDto);
  }

  @UseGuards(AuthGuard)
  @Post('create-by-scenario/:scenarioId')
  @ApiOperation({ summary: 'Create a game by scenario ID' })
  createByScenarioId(
    @Param('scenarioId') scenarioId: string,
    @Body() createGameByScenarioDto: CreateGameByScenarioDto,
  ): Promise<Game> {
    const { userId } = createGameByScenarioDto;
    return this.gameService.createByScenarioId(userId, scenarioId);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les parties (games)' })
  findAll() {
    return this.gameService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une partie (game) par son ID' })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Find game by user ID' })
  findOneByUserId(@Param('userId') userId: string): Promise<Game> {
    return this.gameService.findOneByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une partie (game) par son ID' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une partie (game) par son ID' })
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }
}