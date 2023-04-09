import { DataSource } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = (): Promise<DataSource> =>
  new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    entities: Object.values(entities),
    synchronize: true,
  }).initialize();

export default createDatabaseConnection;
