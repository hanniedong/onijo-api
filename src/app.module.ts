
import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getDatabaseConfig } from './config/database.config';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ load: [getDatabaseConfig] }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(getDatabaseConfig()),
  ],
  providers: [AppService],
})
export class AppModule{}
