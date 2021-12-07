
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getDatabaseConfig } from './config/database.config';
import { GraphQLModule } from '@nestjs/graphql';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ load: [getDatabaseConfig] }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(getDatabaseConfig()),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      debug: true,
      playground: true,
      context: ({ req }) => ({
        headers: req.headers,
      }),
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  providers: [AppService],
})
export class AppModule { }
