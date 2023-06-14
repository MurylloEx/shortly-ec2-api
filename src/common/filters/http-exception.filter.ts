import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {

  getExceptionName(exception: HttpException) {
    return snakeCase('StatusHttp' + exception.name).toLowerCase();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const payload = <Record<string, object>>exception.getResponse();

    delete payload.statusCode;

    response.status(status).json({
      timestamp: new Date(),
      path: request.url,
      error: true,
      status: status,
      code: this.getExceptionName(exception),
      response: payload
    });
  }

}
