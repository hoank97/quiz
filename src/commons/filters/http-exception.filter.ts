import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { IExceptionFilter } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as IExceptionFilter;
    const bodyResponse: IExceptionFilter = {
      statusCode: status,
      message: exceptionResponse.message,
    };
    if (typeof exceptionResponse.message === 'string') {
      bodyResponse.message = [exceptionResponse.message];
    }

    response.status(status).json(bodyResponse);
  }
}
