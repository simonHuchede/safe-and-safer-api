import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('games')  // Ajoute une catégorie "games" dans Swagger
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle partie (game)' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les parties (games)' })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une partie (game) par son ID' })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une partie (game) par son ID' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une partie (game) par son ID' })
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }
}