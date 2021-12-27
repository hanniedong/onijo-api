import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'aws-sdk';
import { FilesService } from 'src/files/files.service';
import { File } from '../database/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File]), ConfigModule],
  controllers: [],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule { }