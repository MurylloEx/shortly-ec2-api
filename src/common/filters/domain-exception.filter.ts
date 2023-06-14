import { snakeCase } from 'lodash';
import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter
} from '@nestjs/common';

import { DomainException } from 'src/domain';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter<DomainException> {

  getExceptionName(exception: DomainException) {
    return snakeCase('Status' + exception.name).toLowerCase();
  }

  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const payload = <Record<string, object>>exception.getResponse();

    delete payload.statusCode;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: true,
      status: status,
      code: this.getExceptionName(exception),
      response: payload
    });
  }

}
