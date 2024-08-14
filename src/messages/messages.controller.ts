import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { User } from 'src/users/entities/user.entity';
import { Message } from './entities/message.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
   constructor(private readonly messagesService: MessagesService) {}
   @Get()
   async getAll() {
      return await this.messagesService.findAll();
   }

   @UsePipes(ValidationPipe)
   @Post()
   async create(@Body() message: CreateMessageDto) {
      console.log(message);
      return await this.messagesService.create(message);
   }
}


