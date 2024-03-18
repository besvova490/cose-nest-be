import { config } from 'dotenv';
import { resolve, join } from 'path';

config({ path: resolve(process.cwd(), '.env') });

export const mongoConfig = {
  type: 'mongodb',
  url: process.env.NEST_MONGO_URL,
  entities: [join(__dirname, '../../**/*.schema{.ts,.js}')],
  logging: true,
  autoLoadEntities: true,
};
