import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateShortUrlHandler,
  FetchOneShortUrlHandler,
  UpdateShortUrlHandler,
  DeleteShortUrlHandler,
  IncrementAccessCountShortUrlHandler,
} from 'src/domain/business/slices/shortly';

import {
  ShortUrl,
  ShortUrlRepository,
  ShortlyDomainService,
} from 'src/domain/business/slices/shortly';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ShortUrl])
  ],
  providers: [
    CreateShortUrlHandler,
    FetchOneShortUrlHandler,
    UpdateShortUrlHandler,
    DeleteShortUrlHandler,
    IncrementAccessCountShortUrlHandler,
    ShortUrlRepository,
    ShortlyDomainService
  ],
  exports: [ShortlyDomainService]
})
export class ShortlyModule { }

