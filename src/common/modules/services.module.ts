import { Module } from '@nestjs/common';

import { ConfigurationService } from 'src/common/services';

import { DomainModule } from 'src/domain';
import { CachingModule } from './caching.module';
import { ConfigurationModule } from './configuration.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    DomainModule,
    CachingModule,
    DatabaseModule,
    ConfigurationModule
  ],
  providers: [
    ConfigurationService
  ],
  exports: [
    ConfigurationService
  ]
})
export class ServicesModule {}
