import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter
} from '@nestjs/common';

@Catch(Error)
export class CriticalErrorFilter implements ExceptionFilter<Error> {

  getExceptionName(exception: Error) {
    return snakeCase('StatusFatal' + exception.name).toLowerCase();
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: true,
      status: 500,
      code: this.getExceptionName(exception),
      response: null
    });
  }

}
