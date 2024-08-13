import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private readonly _userRepository: Repository<User>,
      private readonly logger: Logger,
      // private readonly configService: ConfigService
   ) {
     // const env = configService.get<string>("ENVIRONMENT") 
      //console.log(env); 
      // console.log(process.env.NODE_ENV)
   }



   public async create(createUserDto: CreateUserDto): Promise<User> {
      const user = this._userRepository.create(createUserDto);
      this.logger.log(user);
      return this._userRepository.save(user);
   }

   async findAll(): Promise<User[] | []> {
      return this._userRepository.find({
         order: {
            firstName: 'ASC'
         }
      });
   }

   async findOne(id: string): Promise<User> {
      const user = await this._userRepository.findOneBy({
         id,
      });
      if (!user) {
         throw new NotFoundException();
      }

      return user;
   }

   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
      const user = await this._userRepository.preload({
         id,
         ...updateUserDto,
      });

      if (!user) {
         throw new NotFoundException(`User #${id} not found`);
      }
      return this._userRepository.save(user);
   }

   async remove(id: string) {
      const user = await this._userRepository.findOneBy({ id });

      if (!user) {
         throw new NotFoundException(`User #${id} not found`);
      }

      return this._userRepository.remove(user);
   }

   async removeAll(query: object) {
      console.log(query);
      await this._userRepository.remove(await this._userRepository.find(query));
   }
}
