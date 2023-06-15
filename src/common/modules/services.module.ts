import { Module } from '@nestjs/common';

import { ConfigurationService, ShortlyService } from 'src/common/services';

import { DomainModule } from 'src/domain';
import { CachingModule } from './caching.module';
import { DatabaseModule } from './database.module';
import { ConfigurationModule } from './configuration.module';

@Module({
  imports: [
    DomainModule,
    CachingModule,
    DatabaseModule,
    ConfigurationModule
  ],
  providers: [
    ConfigurationService,
    ShortlyService
  ],
  exports: [
    ConfigurationService,
    ShortlyService
  ]
})
export class ServicesModule {}
