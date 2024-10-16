import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Message } from "./entities/message.entity";

@ApiTags('messages')  // Ajoute une catégorie "messages" dans Swagger
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau message' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Post('bulk-create')
  @ApiOperation({ summary: 'Create multiple messages' })
  createBulk(@Body() createMessagesDto: CreateMessageDto[]): Promise<Message[]> {
    return this.messageService.createBulk(createMessagesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les messages' })
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un message par son ID' })
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un message par son ID' })
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un message par son ID' })
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}