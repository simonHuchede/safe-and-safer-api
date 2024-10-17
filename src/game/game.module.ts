import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game } from './entities/game.entity';
import { ScenarioModule } from "../scenario/scenario.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), ScenarioModule, UserModule],  // Intègre l'entité Game
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService], // Si tu veux utiliser GameService ailleurs
})
export class GameModule {}