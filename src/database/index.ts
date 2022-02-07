import { createConnection } from 'typeorm'

createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.DATABASE_ENTITIES],
  migrations: [process.env.DATABASE_MIGRATIONS],
  cli: {
    migrationsDir: './src/database/migrations',
  },
})
