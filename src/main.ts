import { NestFactory } from '@nestjs/core';
import { ApiModule } from 'src/api';

async function bootstrap() {
  const api = await NestFactory.create(ApiModule);

  await api.listen(8192);
}

bootstrap();
