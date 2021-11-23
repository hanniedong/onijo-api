
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getDatabaseConfig } from './config/database.config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ load: [getDatabaseConfig] }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(getDatabaseConfig()),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        outputAs: 'class',
      },
      debug: true,
      playground: true,
      context: ({ req }) => ({
        headers: req.headers,
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule { }
