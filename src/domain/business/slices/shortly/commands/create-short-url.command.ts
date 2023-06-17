import { ICommand } from '@nestjs/cqrs';

export class CreateShortUrlCommand implements ICommand {
  constructor(
    public readonly realUrl: string
  ) {}
}
