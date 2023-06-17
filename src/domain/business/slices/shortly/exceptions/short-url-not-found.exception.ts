import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class ShortUrlNotFoundDomainException extends DomainException {
  constructor() {
    super('A URL encurtada especificada não foi encontrada.', HttpStatus.NOT_FOUND);
  }
}
