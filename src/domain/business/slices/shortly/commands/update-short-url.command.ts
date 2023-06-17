import { ICommand } from '@nestjs/cqrs';

export class UpdateShortUrlCommand implements ICommand {
  constructor(
    public readonly shortCode: string,
    public readonly realUrl: string
  ) {}
}
