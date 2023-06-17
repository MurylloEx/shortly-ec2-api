import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ShortUrl } from 'src/domain/business/slices/shortly/models';
import { UpdateShortUrlCommand } from 'src/domain/business/slices/shortly/commands';
import { ShortUrlRepository } from 'src/domain/business/slices/shortly/repositories';
import { ShortUrlNotUpdatedDomainException } from 'src/domain/business/slices/shortly/exceptions';

@CommandHandler(UpdateShortUrlCommand)
export class UpdateShortUrlHandler implements ICommandHandler<UpdateShortUrlCommand> {

  constructor(
    private readonly repository: ShortUrlRepository
  ) {}

  async execute(command: UpdateShortUrlCommand): Promise<ShortUrl> {
    try {
      const previousShortUrl = await this.repository.fetchOne({
        where: {
          shortCode: command.shortCode
        }
      });
  
      previousShortUrl.realUrl = command.realUrl;
  
      const updateResult = await this.repository.updateById(
        previousShortUrl.shortId, 
        previousShortUrl
      );
  
      if (!updateResult.affected) {
        throw new ShortUrlNotUpdatedDomainException();
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
