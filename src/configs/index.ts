import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
ConfigModule.forRoot({
  envFilePath: './.env',
});

export const RedisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export const CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const OPTION_LOCAL: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_LOCAL_HOST,
  port: parseInt(process.env.DB_LOCAL_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  // cli: {
  //   migrationsDir: `${__dirname}/migrations`,
  // },
  synchronize: false,
};

export const OPTION_DOCKER: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_DOCKER_HOST,
  port: parseInt(process.env.DB_DOCKER_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  // cli: {
  //   migrationsDir: `${__dirname}/migrations`,
  // },
  synchronize: false,
};
