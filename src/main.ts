import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // remove non specified fields
      forbidNonWhitelisted: true, // return bad request if a field not expected is included in request
      transform: true // transform request body to instance of the dto
   }));
   await app.listen(3000);
}
bootstrap();
