import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class DomainException extends HttpException {
  constructor(response: string | Record<string, any>, status: number, options?: HttpExceptionOptions) {
    super(response, status, options);
  }

  override getResponse(): Record<string, object | string> {
    return {
      name: super.name,
      message: super.getResponse(),
    }
  }
}
