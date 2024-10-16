import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenarioService } from './scenario.service';
import { ScenarioController } from './scenario.controller';
import { Scenario } from './entities/scenario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scenario])],  // Intègre l'entité Scenario
  controllers: [ScenarioController],
  providers: [ScenarioService],
  exports: [ScenarioService],  // Si tu veux utiliser ScenarioService ailleurs
})
export class ScenarioModule {}