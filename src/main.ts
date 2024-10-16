import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Game')
    .setDescription('API pour gérer les jeux, scénarios, messages, et scores')
    .setVersion('1.0')
    .addTag('games')  // Tu peux ajouter des tags pour mieux organiser tes routes dans Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // L'URL pour accéder à la doc Swagger sera "/api"

  await app.listen(process.env.PORT ||3000);
}
bootstrap();