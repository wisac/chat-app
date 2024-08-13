import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

export class ReadUserDto extends PartialType<UpdateUserDto>(CreateUserDto) {
   totalMessagesSent: number;
   totalMessagesReceived: number
   picture: string
   username: string
   id: string

}
