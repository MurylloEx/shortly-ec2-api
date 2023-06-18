import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { ShortUrl } from 'src/domain/business/slices/shortly/models';
import { FetchOneShortUrlQuery } from 'src/domain/business/slices/shortly/queries';
import { CreateShortUrlCommand, DeleteShortUrlCommand, IncrementAccessCountShortUrlCommand, UpdateShortUrlCommand } from 'src/domain/business/slices/shortly/commands';

@Injectable()
export class ShortlyDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async fetchByCode(shortCode: string): Promise<ShortUrl> {
    const query = new FetchOneShortUrlQuery(shortCode);
    return this.queryBus.execute<IQuery, ShortUrl>(query);
  }

  async create(realUrl: string): Promise<ShortUrl> {
    const command = new CreateShortUrlCommand(realUrl);
    return this.commandBus.execute<ICommand, ShortUrl>(command);
  }

  async deleteByCode(shortCode: string): Promise<ShortUrl> {
    const command = new DeleteShortUrlCommand(shortCode);
    return this.commandBus.execute<ICommand, ShortUrl>(command);
  }

  async updateByCode(shortCode: string, realUrl: string): Promise<ShortUrl> {
    const command = new UpdateShortUrlCommand(shortCode, realUrl);
    return this.commandBus.execute<ICommand, ShortUrl>(command);
  }

  async incrementAccessCountByCode(shortCode: string): Promise<ShortUrl> {
    const command = new IncrementAccessCountShortUrlCommand(shortCode);
    return this.commandBus.execute<ICommand, ShortUrl>(command);
  }

}
