import { DataSource } from 'typeorm';
require('dotenv').config();

export const dataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['src/**/entities/**.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
});