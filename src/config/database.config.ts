export const defaults = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5445,
  username: process.env.DB_USERNAME || 'onijo',
  password: process.env.DB_PASSWORD || 'onijo',
  database: process.env.DB_DATABASE || 'onijo_db',
  logging: process.env.DB_LOGGING || true,
  ssl: process.env.DB_USE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false,
  seeds: [__dirname + ' /../database/seeds/**/*.seed.ts'],
  factories: [__dirname + '/../database/factories/**/*.factory.ts'],
  entities: [__dirname + '/../database/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
  cli: {
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
};

export const getDatabaseConfig = (): object => {
  return defaults;
};

export default defaults