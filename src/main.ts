import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ApiModule } from 'src/api';
import { ConfigurationService } from 'src/common';

async function bootstrap() {
  const api = await NestFactory.create<NestExpressApplication>(ApiModule);
  const config = api.get(ConfigurationService);
  const configuredApi = config.configureApi(api);
  await configuredApi.listen(config.configureServerPort());
}

bootstrap();
