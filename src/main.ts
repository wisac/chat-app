import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from 'common/exception';
import { ApiKeyGuard } from 'common/guards/api-key/api-key.guard';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true, // remove non specified fields
         // forbidNonWhitelisted: true, // return bad request if a field not expected is included in request
         transform: true,
         transformOptions: {
            enableImplicitConversion: true, // implicitly convert query params
         },
         // transform request body to instance of the dto
      }),
   );
   app.useGlobalFilters(new DatabaseExceptionFilter())
   app.useGlobalGuards(new ApiKeyGuard)

   await app.listen(process.env.PORT || 4000);
}
bootstrap();
