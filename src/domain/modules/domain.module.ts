import { Module } from '@nestjs/common';
import { BusinessDomainModule } from '../business';
import { ConfigurationDomainModule } from '../config';

@Module({
  imports: [
    BusinessDomainModule,
    ConfigurationDomainModule
  ],
  exports: [
    BusinessDomainModule,
    ConfigurationDomainModule
  ]
})
export class DomainModule {}
