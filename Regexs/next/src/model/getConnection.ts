import 'reflect-metadata';
import { ConnectionOptions, createConnection, Connection, getConnectionManager } from 'typeorm';
import {
  Employees,
  Tasks,
  Groups,
  Nencho,
  NenchoInsuranceLifeInput2020,
  InsuranceCategories,
} from './entity';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
  console.error('##########please set the .env file##########');
  process.exit(1);
}

const options: ConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Employees, Tasks, Groups, Nencho, NenchoInsuranceLifeInput2020, InsuranceCategories],
  logging: false,
  charset: 'utf8mb4',
};

export default async () => {
  const CONNECTION_NAME = 'default';
  let connection: Connection;

  const connectionManager = getConnectionManager();
  if (connectionManager.has(CONNECTION_NAME)) connection = connectionManager.get(CONNECTION_NAME);
  else connection = await createConnection(options);
  return connection;
};
