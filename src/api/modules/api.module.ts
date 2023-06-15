import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common';
import { CodeController, ShortenController } from 'src/api/controllers';

@Module({
  imports: [CommonModule],
  controllers: [
    CodeController,
    ShortenController
  ]
})
export class ApiModule {}
