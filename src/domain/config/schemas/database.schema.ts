import * as Joi from 'joi';

export const DatabaseSchema = Joi.object({
  DATABASE_HOST: Joi.alternatives().try(Joi.string().domain().allow('localhost'), Joi.string().ip()).default('localhost'),
  DATABASE_PORT: Joi.number().port().default(3306),
  DATABASE_NAME: Joi.string(),
  DATABASE_USERNAME: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_LOGGING: Joi.boolean().default(true),
  DATABASE_MIGRATIONS_ENABLE: Joi.boolean().default(false),
  DATABASE_MIGRATIONS_TABLE: Joi.string().default('migrations')
});
