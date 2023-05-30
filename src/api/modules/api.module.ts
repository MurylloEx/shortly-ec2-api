import { Module } from '@nestjs/common';
import { SampleController } from 'src/api/controllers';

@Module({
  imports: [],
  controllers: [SampleController]
})
export class ApiModule {}