import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class ShortUrlNotUpdatedDomainException extends DomainException {
  constructor() {
    super('A URL encurtada pôde ser atualizada com sucesso.', HttpStatus.NOT_FOUND);
  }
}
