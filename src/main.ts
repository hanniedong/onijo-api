import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

const API_VERSION = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'log'],
  });

  Sentry.init({
    dsn: process.env.SENTRY_URL,
    environment: process.env.ENV_NAME,
  });
  app.setGlobalPrefix(API_VERSION);
  const options = new DocumentBuilder()
    .setTitle('Onijo Service')
    .setDescription('Onijo API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_VERSION, app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  ); 

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
 

  const port = configService.get('PORT')
  await app.listen(port || 4040)
}
bootstrap();
