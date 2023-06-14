import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common';
import { SampleController } from 'src/api/controllers';

@Module({
  imports: [CommonModule],
  controllers: [SampleController]
})
export class ApiModule {}