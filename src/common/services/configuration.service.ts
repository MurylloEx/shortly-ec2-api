import { json } from 'express';
import * as compression from 'compression';
import { StoreConfig } from 'cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ModuleRef, Reflector } from '@nestjs/core';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import {
  CacheModuleOptions,
  ClassSerializerInterceptor,
  ExceptionFilter,
  Injectable,
  NestInterceptor,
  PipeTransform,
  ValidationPipe
} from '@nestjs/common';

import {
  CriticalErrorFilter,
  HttpExceptionFilter,
  DomainExceptionFilter
} from 'src/common/filters';

import {
  ResponseInterceptor,
  TimeoutInterceptor,
  VersionInterceptor
} from 'src/common/interceptors';

import {
  AppConfigType,
  CacheConfigType,
  CompressionConfigType,
  DatabaseConfigType,
  OasConfigType,
  RootConfigType,
  SecurityConfigType,
  ServerConfigType
} from 'src/domain';

import { ConfigurationDomainService } from 'src/domain';

@Injectable()
export class ConfigurationService {

  constructor(
    private readonly configurationDomainService: ConfigurationDomainService
  ) {}

  get app(): AppConfigType {
    return this.configurationDomainService.app;
  }

  get cache(): CacheConfigType {
    return this.configurationDomainService.cache;
  }

  get compression(): CompressionConfigType {
    return this.configurationDomainService.compression;
  }

  get database(): DatabaseConfigType {
    return this.configurationDomainService.database;
  }

  get oas(): OasConfigType {
    return this.configurationDomainService.oas;
  }

  get root(): RootConfigType {
    return this.configurationDomainService.root;
  }

  get security(): SecurityConfigType {
    return this.configurationDomainService.security;
  }

  get server(): ServerConfigType {
    return this.configurationDomainService.server;
  }

  configureServerGlobalPrefix(): string {
    return this.configurationDomainService.configureServerGlobalPrefix();
  }

  configureServerPort(): number {
    return this.configurationDomainService.configureServerPort()
  }

  configureSwaggerPath(): string {
    return this.configurationDomainService.configureSwaggerPath();
  }

  configureSwagger(): DocumentBuilder {
    return this.configurationDomainService.configureSwagger();
  }

  configureCors() {
    return this.configurationDomainService.configureCors();
  }

  configureCompression() {
    return this.configurationDomainService.configureCompression();
  }

  configureThrottler(): ThrottlerModuleOptions {
    return this.configurationDomainService.configureThrottler();
  }

  configureJwt(): JwtModuleOptions {
    return this.configurationDomainService.configureJwt();
  }

  configureTypeOrm(): TypeOrmModuleOptions {
    return this.configurationDomainService.configureTypeOrm();
  }

  configureCache(): Partial<CacheModuleOptions<StoreConfig>> {
    return this.configurationDomainService.configureCache();
  }

  configureGlobalPipes(): PipeTransform[] {
    return [
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      })
    ];
  }

  configureGlobalFilters(): ExceptionFilter[] {
    return [
      new CriticalErrorFilter(),
      new HttpExceptionFilter(),
      new DomainExceptionFilter()
    ];
  }

  configureGlobalInterceptors(reflector: Reflector): NestInterceptor[] {
    return [
      new ResponseInterceptor(reflector),
      new TimeoutInterceptor(),
      new VersionInterceptor(this, reflector),
      new ClassSerializerInterceptor(reflector)
    ];
  }

  configureMiddlewares(): Function[] {
    return [
      json({ limit: '10mb' }),
      compression(this.configureCompression())
    ];
  }

  configureEntities(): Function[] {
    return this.configurationDomainService.configureEntities();
  }

  configureMigrations(): Function[] {
    return this.configurationDomainService.configureMigrations();
  }

  configureApi(api: NestExpressApplication): NestExpressApplication {
    const reflector = api.get(Reflector);

    api.enableCors(this.configureCors());
    api.setGlobalPrefix(this.configureServerGlobalPrefix());
    api.use(...this.configureMiddlewares());
    api.useGlobalPipes(...this.configureGlobalPipes());
    api.useGlobalFilters(...this.configureGlobalFilters());
    api.useGlobalInterceptors(...this.configureGlobalInterceptors(reflector));

    const document = SwaggerModule.createDocument(api, this.configureSwagger().build());
    SwaggerModule.setup(this.configureSwaggerPath(), api, document);

    return api;
  }

}
