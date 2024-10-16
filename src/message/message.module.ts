import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message]),],  // Intègre l'entité Message
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],  // Si tu veux utiliser MessageService ailleurs
})
export class MessageModule {}