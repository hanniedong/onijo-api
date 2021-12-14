module.exports = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5445,
  username: process.env.DB_USERNAME || 'onijo',
  password: process.env.DB_PASSWORD || 'onijo',
  database: process.env.DB_DATABASE || 'onijo_db',
  logging: process.env.DB_LOGGING || true,
  ssl: process.env.DB_USE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: true,
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  entities: ['src/database/entities/**/*{.ts,.js}'],
  migrations: ['src/migration/**/*{.ts,.js}'],
  cli: {
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
};
