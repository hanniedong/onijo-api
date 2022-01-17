import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ElasticSearchModule } from 'src/elastic-search/elastic-search.module';
import { CommunitiesController } from './communities.controller';
import { CommunitiesResolver } from './communities.resolver';
import { CommunitiesService } from './communities.service';

@Module({
  imports: [
    ConfigModule,
    ElasticSearchModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesResolver],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
