import { DataSource, DataSourceOptions } from 'typeorm';

// configs
import { databaseConfig } from './src/config/database/database.config';

export default new DataSource(databaseConfig as DataSourceOptions);
