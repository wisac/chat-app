import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   Query,
   ParseBoolPipe,
   ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './mapping/user.mapping';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Post()
   async create(@Body() createUserDto: CreateUserDto) {
      const user = await this.usersService.create(createUserDto);

      return UserMapper.mapToDto(user);
   }

   @Get()
   findAll() {
      return this.usersService.findAll();
   }

   @Get(':id')
   async findOne(@Param('id') id: string) {
      console.log(id);
      const user = await this.usersService.findOne(id);

      return UserMapper.mapToDto(user);
   }

   @Patch(':id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
   }

   @Delete('remove')
   removeAll(@Query('verifiedEmail', new ParseBoolPipe({
      errorHttpStatusCode: 400,
      optional: true
   })) verifiedEmail: boolean) {
      return this.usersService.removeAll({
         verifiedEmail,
      });
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.usersService.remove(id);
   }
}
