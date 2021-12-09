import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'aws-sdk';
import { FilesService } from 'src/files/files.service';
import PublicFile from './entities/publicFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), ConfigModule],
  controllers: [],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule { }