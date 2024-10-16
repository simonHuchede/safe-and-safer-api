import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { ScoreModule } from './score/score.module';
import { ScenarioModule } from './scenario/scenario.module';
import { GameModule } from "./game/game.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "node:process";
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';



@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.local',  // Charge le fichier .env.local
    isGlobal: true,  // Rend les variables accessibles globalement
  }),
    TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    useUnifiedTopology: true,
    synchronize: true,  // Active la synchronisation automatique (en développement)
    entities: [__dirname + '/**/*.entity{.ts,.js}'],  // Charge toutes les entités
  }),
    MessageModule, ScoreModule, ScenarioModule, GameModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
