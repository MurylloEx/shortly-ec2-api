import { ICommand } from '@nestjs/cqrs';

export class DeleteShortUrlCommand implements ICommand {
  constructor(
    public readonly shortCode: string
  ) {}
}
