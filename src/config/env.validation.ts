import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DB_PORT: Joi.number().port().default(5432),
  DB_PASSWORD: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  // SECRET_KEY: Joi.string().required(),
  JWT_TOKEN_SECRET: Joi.string().required(),
  JWT_TOKEN_EXPIRES_IN: Joi.number(),
  JWT_TOKEN_AUDIENCE: Joi.string(),
  JWT_TOKEN_ISSUER: Joi.string(),
});
