import { StoreConfig } from 'cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CacheModuleOptions, Inject, Injectable } from '@nestjs/common';

import {
  AppConfig,
  CacheConfig,
  CompressionConfig,
  DatabaseConfig,
  OasConfig,
  RootConfig,
  SecurityConfig,
  ServerConfig
} from 'src/domain/config/slices';

import {
  AppConfigType,
  CacheConfigType,
  CompressionConfigType,
  DatabaseConfigType,
  RootConfigType,
  OasConfigType,
  SecurityConfigType,
  ServerConfigType
} from 'src/domain/config/slices';

import { ShortUrl } from 'src/domain/business';
import { CreateTableShortUrlMigration1686805447945 } from 'src/domain/business';

@Injectable()
export class ConfigurationDomainService {

  constructor(
    @Inject(AppConfig.KEY)
    public readonly app: AppConfigType,
    @Inject(CacheConfig.KEY)
    public readonly cache: CacheConfigType,
    @Inject(CompressionConfig.KEY)
    public readonly compression: CompressionConfigType,
    @Inject(DatabaseConfig.KEY)
    public readonly database: DatabaseConfigType,
    @Inject(OasConfig.KEY)
    public readonly oas: OasConfigType,
    @Inject(RootConfig.KEY)
    public readonly root: RootConfigType,
    @Inject(SecurityConfig.KEY)
    public readonly security: SecurityConfigType,
    @Inject(ServerConfig.KEY)
    public readonly server: ServerConfigType
  ) { }

  configureServerGlobalPrefix(): string {
    return this.server.globalPrefix;
  }

  configureServerPort(): number {
    return this.server.port;
  }

  configureSwaggerPath(): string {
    return this.oas.path;
  }

  configureSwagger(): DocumentBuilder {
    return new DocumentBuilder()
      .addTag(this.oas.tag)
      .addSecurity('Authorization', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'authorization',
        description: 'The bearer token in JWT format.'
      })
      .addSecurity('X-App-Version', {
        type: 'apiKey',
        in: 'header',
        name: 'x-app-version',
        description: 'The current acceptable app version'
      })
      .addSecurityRequirements('Authorization', ['authorization'])
      .addSecurityRequirements('X-App-Version', ['x-app-version'])
      .setTitle(this.oas.title)
      .setDescription(this.oas.description)
      .setVersion(this.oas.version)
      .setLicense(
        this.oas.license.name,
        this.oas.license.website
      )
      .setContact(
        this.oas.contact.author.name,
        this.oas.contact.author.website,
        this.oas.contact.author.email
      );
  }

  configureCors() {
    return {
      origin: this.security.cors.origin,
      maxAge: this.security.cors.maxAge,
    };
  }

  configureCompression() {
    return {
      level: this.compression.level,
      memLevel: this.compression.memoryLevel
    };
  }

  configureThrottler(): ThrottlerModuleOptions {
    return {
      ttl: this.security.throttler.ttl,
      limit: this.security.throttler.limit
    };
  }

  configureJwt(): JwtModuleOptions {
    return {
      secret: this.security.jwt.symmetricKey,
      signOptions: {
        issuer: this.security.jwt.issuer,
        expiresIn: this.security.jwt.expiration
      }
    };
  }

  configureTypeOrm(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      database: this.database.name,
      host: this.database.host,
      port: this.database.port,
      username: this.database.username,
      password: this.database.password,
      synchronize: this.database.synchronize,
      logging: this.database.logging,
      migrationsRun: this.database.migrationsEnable,
      migrationsTableName: this.database.migrationsTable,
      namingStrategy: new SnakeNamingStrategy(),
      entities: this.configureEntities(),
      migrations: this.configureMigrations()
    };
  }

  configureCache(): Partial<CacheModuleOptions<StoreConfig>> {
    return {
      ttl: this.cache.ttl,
      max: this.cache.max
    };
  }

  configureEntities(): Function[] {
    return [ShortUrl];
  }

  configureMigrations(): Function[] {
    return [
      CreateTableShortUrlMigration1686805447945
    ];
  }

}
