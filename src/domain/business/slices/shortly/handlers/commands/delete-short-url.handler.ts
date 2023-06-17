import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ShortUrl } from 'src/domain/business/slices/shortly/models';
import { DeleteShortUrlCommand } from 'src/domain/business/slices/shortly/commands';
import { ShortUrlRepository } from 'src/domain/business/slices/shortly/repositories';
import { ShortUrlNotFoundDomainException } from 'src/domain/business/slices/shortly/exceptions';

@CommandHandler(DeleteShortUrlCommand)
export class DeleteShortUrlHandler implements ICommandHandler<DeleteShortUrlCommand> {

  constructor(
    private readonly repository: ShortUrlRepository
  ) {}

  async execute(command: DeleteShortUrlCommand): Promise<ShortUrl> {
    try {
      const previousShortUrl = await this.repository.fetchOne({
        where: {
          shortCode: command.shortCode
        }
      });
  
      const updateResult = await this.repository.deleteById(previousShortUrl.shortId);
  
      if (!updateResult.affected) {
        throw new ShortUrlNotFoundDomainException();
      }
  
      return previousShortUrl;
    } catch (e) {
      throw new ShortUrlNotFoundDomainException();
    }
  }

}
