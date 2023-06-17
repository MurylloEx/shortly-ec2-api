import { IQuery } from '@nestjs/cqrs';

export class FetchOneShortUrlQuery implements IQuery {
  constructor(
    public readonly shortCode: string
  ) {}
}
