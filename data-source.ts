import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSource = new DataSource({
  type: 'mariadb',
  host:
    process.env.NODE_ENV === 'docker'
      ? process.env.DB_DOCKER_HOST
      : process.env.DB_LOCAL_HOST,
  port:
    process.env.NODE_ENV === 'docker'
      ? parseInt(process.env.DB_DOCKER_PORT)
      : parseInt(process.env.DB_LOCAL_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['./src/modules/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
});
