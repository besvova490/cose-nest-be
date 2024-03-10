import { config } from 'dotenv';
import { resolve, join } from 'path';

config({ path: resolve(process.cwd(), '.env') });

export const databaseConfig = {
  type: 'postgres',
  url: process.env.NEST_DATABASE_URL,
  entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../../migrations/*{.ts,.js}')],
  synchronize: false,
  logging: false,
  useUTC: true,
  cli: {
    migrationsDir: '../../migrations',
  },
};
