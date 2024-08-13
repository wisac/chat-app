import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'config/app.config';
import { MessagesModule } from './messages/messages.module';

@Module({
   imports: [
      UsersModule,
      MessagesModule,
      // load .env file
      ConfigModule.forRoot({
         //   ignoreEnvFile: true  : set this in production
         load: [appConfig],
         // validationSchema: joi.object
      }),
      TypeOrmModule.forRoot({
         type: "postgres",
         host: process.env.DATABASE_HOST,
         port: Number(process.env.DATABASE_PORT),
         database: process.env.DATABASE_NAME,
         username: process.env.DATABASE_USER,
         password: process.env.DATABASE_PASSWORD,
         synchronize: true,
         autoLoadEntities: true,
      }),
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
