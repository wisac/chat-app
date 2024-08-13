import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Message } from 'src/messages/entities/message.entity';


@Module({
   imports: [TypeOrmModule.forFeature([User,Message])],
   controllers: [UsersController],
   providers: [UsersService, Logger,ConfigService],
})
export class UsersModule {}
