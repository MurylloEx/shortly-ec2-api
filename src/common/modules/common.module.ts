import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import { CachingModule } from './caching.module';
import { DatabaseModule } from './database.module';
import { ServicesModule } from './services.module';

@Module({
  imports: [
    DatabaseModule,
    ServicesModule,
    DomainModule,
    CachingModule,
  ],
  exports: [
    DatabaseModule,
    ServicesModule,
    DomainModule,
    CachingModule,
  ]
})
export class CommonModule {}
