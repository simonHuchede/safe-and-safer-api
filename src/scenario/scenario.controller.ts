import { Controller, Get, Post, Patch, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Scenario } from "./entities/scenario.entity";
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('scenarios')  // Ajoute une catégorie "scenarios" dans Swagger
@Controller('scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau scénario' })
  create(@Body() createScenarioDto: CreateScenarioDto) {
    return this.scenarioService.create(createScenarioDto);
  }

  @UseGuards(AuthGuard)
  @Post('bulk-create')
  @ApiOperation({ summary: 'Create multiple scenarios' })
  createBulk(@Body() createScenariosDto: CreateScenarioDto[]): Promise<Scenario[]> {
    return this.scenarioService.createBulk(createScenariosDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les scénarios' })
  findAll() {
    return this.scenarioService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un scénario par son ID' })
  findOne(@Param('id') id: string) {
    return this.scenarioService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un scénario par son ID' })
  update(@Param('id') id: string, @Body() updateScenarioDto: UpdateScenarioDto) {
    return this.scenarioService.update(id, updateScenarioDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un scénario par son ID' })
  remove(@Param('id') id: string) {
    return this.scenarioService.remove(id);
  }
}