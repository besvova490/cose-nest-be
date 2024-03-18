import { DataSource, DataSourceOptions } from 'typeorm';

// configs
import { databaseConfig } from './src/config/database/postgres.config';

export default new DataSource(databaseConfig as DataSourceOptions);
