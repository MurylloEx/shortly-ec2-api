import { AppConfig } from './app.config';
import { CacheConfig } from './cache.config';
import { CompressionConfig } from './compression.config';
import { DatabaseConfig } from './database.config';
import { OasConfig } from './oas.config';
import { RootConfig } from './root.config';
import { SecurityConfig } from './security.config';
import { ServerConfig } from './server.config';

export * from './app.config';
export * from './cache.config';
export * from './compression.config';
export * from './database.config';
export * from './oas.config';
export * from './root.config';
export * from './security.config';
export * from './server.config';

export const ConfigSlices = [
  AppConfig,
  CacheConfig,
  CompressionConfig,
  DatabaseConfig,
  OasConfig,
  RootConfig,
  SecurityConfig, 
  ServerConfig,
];
