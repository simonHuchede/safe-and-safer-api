import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('scenarios')  // Ajoute une catégorie "scenarios" dans Swagger
@Controller('scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau scénario' })
  create(@Body() createScenarioDto: CreateScenarioDto) {
    return this.scenarioService.create(createScenarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les scénarios' })
  findAll() {
    return this.scenarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un scénario par son ID' })
  findOne(@Param('id') id: string) {
    return this.scenarioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un scénario par son ID' })
  update(@Param('id') id: string, @Body() updateScenarioDto: UpdateScenarioDto) {
    return this.scenarioService.update(id, updateScenarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un scénario par son ID' })
  remove(@Param('id') id: string) {
    return this.scenarioService.remove(id);
  }
}