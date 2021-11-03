import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { getDbConnectionOptions, runDbMigrations } from 'src/utils/database.utils';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV)),
    {
      // logger: Boolean(process.env.ENABLELOGGING),
      logger: console,
    },
  );

  /**
  * Run DB migrations
  */
  await runDbMigrations();

  await app.listen(3000);
  Logger.log(`Server started running on http://localhost:${3000}`, 'Bootstrap');
}
bootstrap();
