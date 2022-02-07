module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.DATABASE_ENTITIES],
  migrations: [process.env.DATABASE_MIGRATIONS],
  extra: {
    ssl: true,
  },
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
