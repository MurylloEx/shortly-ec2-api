import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShortUrl } from 'src/domain/business/slices/shortly/models';
import { FetchOneShortUrlQuery } from 'src/domain/business/slices/shortly/queries';
import { ShortUrlRepository } from 'src/domain/business/slices/shortly/repositories';
import { ShortUrlNotFoundDomainException } from 'src/domain/business/slices/shortly/exceptions';

@QueryHandler(FetchOneShortUrlQuery)
export class FetchOneShortUrlHandler implements IQueryHandler<FetchOneShortUrlQuery> {

  constructor(private readonly repository: ShortUrlRepository) {}

  async execute(query: FetchOneShortUrlQuery): Promise<ShortUrl> {
    try {
      return await this.repository.fetchOne({
        where: {
          shortCode: query.shortCode
        }
      });
    } catch (e) {
      throw new ShortUrlNotFoundDomainException();
    }
  }

}
