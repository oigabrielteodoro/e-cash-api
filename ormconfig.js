module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.DATABASE_ENTITIES],
  migrations: [process.env.DATABASE_MIGRATIONS],
  // ssl: process.env.DATABASE_SSL,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: process.env.DATABASE_SSL,
  //   },
  // },
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
