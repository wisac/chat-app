import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MessagesService {

   constructor(
      @InjectRepository(Message)
      private readonly _messageRepository: Repository<Message>,
      private readonly _logger: Logger,
   ) {}

   public async findAll(): Promise<Message[]> {
      const messages = await this._messageRepository.find();
      this._logger.verbose(messages);
      return messages;
   }

   public async create(message: CreateMessageDto) {
      return this._messageRepository.manager.transaction(
         async (entityManager) => {
            const sender = await entityManager.findOneBy(User, {
               id: message.senderId,
            });

            if (!sender) {
               throw new NotFoundException(
                  `User with Id ${message.senderId} was not found`,
               );
            }

            const receiver = await entityManager.findOneBy(User, {
               id: message.receiverId,
            });

            console.log(message.receiverId,receiver);

            if (!receiver) {
               throw new NotFoundException(
                  `User with Id ${message.receiverId} was not found`,
               );
            }

            const newMessage = entityManager.create(Message, {
               ...message,
               sender,
               receiver,
            });

            return await entityManager.save(newMessage);
         },
      );
   }
}
