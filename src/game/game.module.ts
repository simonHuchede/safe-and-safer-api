import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game } from './entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],  // Intègre l'entité Game
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],  // Si tu veux utiliser GameService ailleurs
})
export class GameModule {}