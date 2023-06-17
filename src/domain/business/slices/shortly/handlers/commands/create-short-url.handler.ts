import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateShortUrlCommand } from 'src/domain/business/slices/shortly/commands';
import { ShortUrlRepository } from 'src/domain/business/slices/shortly/repositories';
import { ShortUrl } from 'src/domain/business/slices/shortly/models';

@CommandHandler(CreateShortUrlCommand)
export class CreateShortUrlHandler implements ICommandHandler<CreateShortUrlCommand> {

  constructor(
    private readonly repository: ShortUrlRepository
  ) {}

  async execute(command: CreateShortUrlCommand): Promise<ShortUrl> {
    return await this.repository.create(command.realUrl);
  }

}
