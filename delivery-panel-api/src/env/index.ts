import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT_LOCAL: z.coerce.number().default(3333),
  PORT_FRONTEND: z.coerce.number().default(5173),
  DATABASE_URL: z.coerce.string().min(5),
  POSTGRESQL_USERNAME: z.coerce.string().min(5),
  POSTGRESQL_PASSWORD: z.coerce.string().min(5),
  POSTGRESQL_DATABASE: z.coerce.string().min(5),
  APP_ROWS_PER_PAGE: z.coerce.number().default(20),
  JWT_SECRET: z.coerce.string().min(10),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

    throw new Error('Invalid environment variables.');
}

export const env = _env.data;
