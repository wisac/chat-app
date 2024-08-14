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
   HttpCode,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './mappings/user.mapping';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Post()
   async create(@Body() createUserDto: CreateUserDto) {
      const user = await this.usersService.create(createUserDto);

      return UserMapper.mapToDto(user);
   }


   @Get()
   async findAll() {
      const users = await this.usersService.findAll();
      console.log(users)
      return users.map((user) => UserMapper.mapToDto(user));
   }

   
   @Get(':id')
   async findOne(@Param('id') id: string) {
      console.log(id);
      const user = await this.usersService.findOne(id);

      return UserMapper.mapToDto(user);
   }

   @Patch(':id')
   async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      const user = await this.usersService.update(id, updateUserDto);

      return UserMapper.mapToDto(user);
   }


   @Delete('remove')
   @HttpCode(204)
   removeAll(@Query('verifiedEmail', new ParseBoolPipe({
      errorHttpStatusCode: 400,
      optional: true
   })) verifiedEmail: boolean) {
      return this.usersService.removeAll({
         verifiedEmail,
      });
   }

   @Delete(':id')
   @HttpCode(204)
   remove(@Param('id') id: string) {
      return this.usersService.remove(id);
   }
}
