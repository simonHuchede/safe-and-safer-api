import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { Score } from './entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],  // Intègre l'entité Score
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScoreService],  // Si tu veux utiliser ScoreService ailleurs
})
export class ScoreModule {}