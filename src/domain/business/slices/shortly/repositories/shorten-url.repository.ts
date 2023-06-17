import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';

import { ShortUrl } from 'src/domain/business/slices/shortly/models';
import { ShortUrlNotFoundDomainException } from 'src/domain/business/slices/shortly/exceptions';

@Injectable()
export class ShortUrlRepository {

  constructor(
    @InjectRepository(ShortUrl)
    private readonly repository: Repository<ShortUrl>,
  ) {}

  create(realUrl: string): Promise<ShortUrl> {
    const user = this.repository.create({ realUrl });
    return this.repository.save(user);
  }

  fetchOne(options: FindOneOptions<ShortUrl>): Promise<ShortUrl> {
    try {
      return this.repository.findOneOrFail(options);
    } catch (error: any) {
      throw new ShortUrlNotFoundDomainException();
    }
  }

  fetch(options?: FindManyOptions<ShortUrl>): Promise<ShortUrl[]> {
    try {
      return this.repository.find(options);
    } catch (error: any) {
      throw new ShortUrlNotFoundDomainException();
    }
  }

  fetchById(shortId: string): Promise<ShortUrl> {
    try {
      return this.repository.findOneByOrFail({ shortId });
    } catch (error) {
      throw new ShortUrlNotFoundDomainException();
    }
  }

  updateById(id: string, user: Partial<ShortUrl>): Promise<UpdateResult> {
    return this.repository.update(id, user);
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

}
