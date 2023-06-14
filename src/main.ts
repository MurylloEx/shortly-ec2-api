import { json } from 'express';
import * as compression from 'compression';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { ApiModule } from 'src/api';

import {
  ConfigurationService,
  DomainExceptionFilter,
  CriticalErrorFilter,
  HttpExceptionFilter
} from 'src/common';

import {
  ResponseInterceptor,
  TimeoutInterceptor,
  VersionInterceptor
} from 'src/common';

async function bootstrap() {
  const api = await NestFactory.create<NestExpressApplication>(ApiModule);

  const reflector = api.get(Reflector);
  const config = api.get(ConfigurationService);

  api.enableCors(config.configureCors());
  api.setGlobalPrefix(config.configureServerGlobalPrefix());
  api.use(json({ limit: '10mb' }));
  api.use(compression(config.configureCompression()));
  api.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  api.useGlobalFilters(
    new CriticalErrorFilter(),
    new HttpExceptionFilter(),
    new DomainExceptionFilter()
  );
  api.useGlobalInterceptors(
    new ResponseInterceptor(reflector),
    new TimeoutInterceptor(),
    new VersionInterceptor(config, reflector),
    new ClassSerializerInterceptor(reflector)
  );

  const swaggerOptions = config.configureSwagger().build();
  const document = SwaggerModule.createDocument(api, swaggerOptions);

  SwaggerModule.setup(config.configureSwaggerPath(), api, document);

  await api.listen(config.configureServerPort());
}

bootstrap();
