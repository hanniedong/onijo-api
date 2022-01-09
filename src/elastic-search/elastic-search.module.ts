import { Module } from '@nestjs/common';
import { ElasticSearchService } from './elastic-search.service';

@Module({
  imports: [],
  providers: [ElasticSearchService],
  exports: [ElasticSearchService],
})
export class ElasticSearchModule {}
