import { Module } from '@nestjs/common';
import { ShortlyModule } from './shortly.module';

@Module({
  imports: [ShortlyModule],
  exports: [ShortlyModule]
})
export class BusinessDomainModule { }
