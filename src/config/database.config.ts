export const defaults = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5445,
  username: process.env.DB_USERNAME || 'onijo',
  password: process.env.DB_PASSWORD || 'onijo',
  database: process.env.DB_DATABASE || 'onijo_db',
  logging: process.env.DB_LOGGING || true,
  ssl: process.env.DB_USE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: true,
  seeds: ['src/database/seeds/**/*.seed.ts'],
  factories: ['src/database/factories/**/*.factory.ts'],
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
  cli: {
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
};

export const getDatabaseConfig = (): object => {
  console.log(defaults)
  return defaults;
};

export default defaults