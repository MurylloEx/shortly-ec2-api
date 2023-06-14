import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type DatabaseConfigSlice = {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  synchronize: boolean;
  logging: boolean;
  migrationsEnable: boolean;
  migrationsTable: string;
}

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export const DatabaseConfig = registerAs<DatabaseConfigSlice>(DATABASE_CONFIG, () => ({
  host: cast(process.env.DATABASE_HOST, 'String'),
  port: cast(process.env.DATABASE_PORT, 'Number'),
  name: cast(process.env.DATABASE_NAME, 'String'),
  username: cast(process.env.DATABASE_USERNAME, 'String'),
  password: cast(process.env.DATABASE_PASSWORD, 'String'),
  synchronize: cast(process.env.DATABASE_SYNCHRONIZE, 'Boolean'),
  logging: cast(process.env.DATABASE_LOGGING, 'Boolean'),
  migrationsEnable: cast(process.env.DATABASE_MIGRATIONS_ENABLE, 'Boolean'),
  migrationsTable: cast(process.env.DATABASE_MIGRATIONS_TABLE, 'String')
}));

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;
