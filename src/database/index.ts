import {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from '@/config'
import { createConnection } from 'typeorm'

createConnection({
  type: 'postgres',
  port: DATABASE_PORT,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  username: DATABASE_USERNAME,
  entities: ['./src/app/core/**/infra/entities/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
})
