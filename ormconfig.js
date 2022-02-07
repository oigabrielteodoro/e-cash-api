module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.DATABASE_ENTITIES],
  migrations: [process.env.DATABASE_MIGRATIONS],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
