import { ICommand } from '@nestjs/cqrs';

export class IncrementAccessCountShortUrlCommand implements ICommand {
  constructor(
    public readonly shortCode: string
  ) {}
}
