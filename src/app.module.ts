import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [UsersModule, TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      database: "chat",
      username: "wilson",
      password: "password",
      synchronize: true,
      autoLoadEntities: true

   })],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
