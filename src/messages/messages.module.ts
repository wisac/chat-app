import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { User } from "src/users/entities/user.entity";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { EntityManager } from "typeorm";

@Module({
   imports: [TypeOrmModule.forFeature([Message, User])],
   providers: [MessagesService,Logger, EntityManager],
   controllers: [MessagesController]
})

export class MessagesModule{}