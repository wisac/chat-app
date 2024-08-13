import { createMapper } from '@automapper/core';
import { User } from '../entities/user.entity';
import { ReadUserDto } from '../dto/read-user.dto';

// Create and export the mapper
export class UserMapper {
   static mapToDto(user: User): ReadUserDto {
      const dto = new ReadUserDto();
      dto.email = user.email;
      dto.firstName = user.firstName;
      dto.lastName = user.lastName;
      dto.picture = user.picture;
      dto.totalMessagesSent = user.totalMessagesSent;

      return dto;
   }
}
