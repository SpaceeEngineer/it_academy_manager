import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      url: process.env.POSTGRES_URL || null,
      host: process.env.POSTGRES_URL ? null : process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_URL ? null : parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_URL ? null : process.env.POSTGRES_USER,
      database: process.env.POSTGRES_URL ? null : process.env.POSTGRES_DB,
      password: process.env.POSTGRES_URL ? null : process.env.POSTGRES_PASSWORD,
      entities: [__dirname + '/../**/entities/*.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../database/migrations',
      },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL || null,
  host: process.env.POSTGRES_URL ? null : process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_URL ? null : parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_URL ? null : process.env.POSTGRES_USER,
  database: process.env.POSTGRES_URL ? null : process.env.POSTGRES_DB,
  password: process.env.POSTGRES_URL ? null : process.env.POSTGRES_PASSWORD,
  entities: [__dirname + '/../**/entities/*.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};
