import {
   ExceptionFilter,
   Catch,
   ArgumentsHost,
   HttpException,
   HttpStatus,
} from '@nestjs/common';
import { error } from 'console';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
   catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Database error';
      let errorDetails = {};

      // Extract information from the error
      if (exception instanceof QueryFailedError) {
         const driverError = exception.driverError as any;
         const { column } = driverError;
         const {table} = driverError


         if (driverError.code === '23502') {
            // Null value constraint violation (PostgreSQL)
            status = HttpStatus.BAD_REQUEST;
            
            message = `${column} cannot be null`;
            
         } else if (driverError.code === '23505') {
            // Unique constraint violation (PostgreSQL)
            status = HttpStatus.CONFLICT;
            const errorDetails = {
               field: driverError.detail.match(/\((.*?)\)/)?.[1],
               value: driverError.detail.match(/=\((.*?)\)/)?.[1],
               
            };
            message = `${table} with ${errorDetails.field} : ${errorDetails.value} already exist`;

         } else {
            // Handle other database-specific errors
            message = driverError.message || 'Unknown database error';
         }
      }

      response.status(status).json({
         statusCode: status,
         timestamp: new Date().toISOString(),
         path: request.url,
         message,
         details: errorDetails,
      });
   }
}
