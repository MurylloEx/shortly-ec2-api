import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ShortUrl } from 'src/domain/business/slices/shortly/models';
import { IncrementAccessCountShortUrlCommand } from 'src/domain/business/slices/shortly/commands';
import { ShortUrlRepository } from 'src/domain/business/slices/shortly/repositories';
import { ShortUrlNotUpdatedDomainException } from 'src/domain/business/slices/shortly/exceptions';

@CommandHandler(IncrementAccessCountShortUrlCommand)
export class IncrementAccessCountShortUrlHandler implements ICommandHandler<IncrementAccessCountShortUrlCommand> {

  constructor(
    private readonly repository: ShortUrlRepository
  ) {}

  async execute(command: IncrementAccessCountShortUrlCommand): Promise<ShortUrl> {
    try {
      const previousShortUrl = await this.repository.fetchOne({
        where: {
          shortCode: command.shortCode
        }
      });

      previousShortUrl.accessCount++;
  
      const updateResult = await this.repository.updateById(
        previousShortUrl.shortId, 
        previousShortUrl
      );
  
      if (!updateResult.affected) {
        throw new Error();
      }
  
      const currentShortUrl = await this.repository.fetchOne({
        where: {
          shortCode: command.shortCode
        }
      });
  
      return currentShortUrl;
    } catch (e) {
      throw new ShortUrlNotUpdatedDomainException();
    }
  }

}
