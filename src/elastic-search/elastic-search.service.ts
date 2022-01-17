/* eslint @typescript-eslint/no-var-requires: "off" */
import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticSearchService {
  public readonly client;
  private readonly logger = new Logger(ElasticSearchService.name);

  constructor() {
    this.client = new Client({
      node: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200',
      auth: {
        username: process.env.ELASTIC_SEARCH_USERNAME,
        password: process.env.ELASTIC_SEARCH_PASSWORD,
      },
    });
  }
  async deleteIndices(index: string) {
    try {
      await this.client.indices.delete({ index });
    } catch (e) {
      throw e;
    }
  }

  async createIndices(index: string, properties: Record<string, any>) {
    try {
      await this.client.indices.create({
        index: index,
      });
    } catch (e) {
      throw e;
    }
  }

  async bulkUpload(items: Array<object>, index: string) {
    const logger = this.logger;

    const ELASTIC_RETRY_COUNT = 3;
    const ELASTIC_RETRY_WAIT_IN_MS = 3000;
    const ELASTIC_CONCURRENCY_COUNT = 5;
    const ELASTIC_BODY_SIZE_IN_BYTES = 3000000;
    const ELASTIC_FLUSH_INTERVAL_IN_MS = 30000;

    try {
      return await this.client.helpers.bulk({
        datasource: items,
        retries: ELASTIC_RETRY_COUNT,
        wait: ELASTIC_RETRY_WAIT_IN_MS,
        concurrency: ELASTIC_CONCURRENCY_COUNT,
        flushBytes: ELASTIC_BODY_SIZE_IN_BYTES,
        flushInterval: ELASTIC_FLUSH_INTERVAL_IN_MS,
        refreshOnCompletion: true,
        onDocument(doc) {
          return {
            create: { _index: index, _id: doc.id },
          };
        },
        onDrop(doc) {
          logger.log(`Document upload failed: ${doc?.error?.reason}`);
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async getStatsForIndex(index: string) {
    try {
      return await this.client.indices.stats({ index });
    } catch (e) {
      throw e;
    }
  }

  async search(params: object) {
    try {
      return await this.client.search(params);
    } catch (e) {
      throw e;
    }
  }

  async checkIndexExists(index: string) {
    try {
      return this.client.indices.exists({ index });
    } catch (e) {
      throw e;
    }
  }

  async upsertDocument(index: string, id: number, doc: object): Promise<any> {
    const body = {
      doc: {
        ...doc,
      },
      doc_as_upsert: true,
    };
    try {
      return await this.client.update({
        index,
        id,
        body,
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteDocument(index: string, id: string): Promise<boolean> {
    try {
      const { body } = await this.client.exists({ index: index, id: id });

      if (body) {
        await this.client.delete({ index: index, id: id });
        return true;
      }

      return false;
    } catch (e) {
      throw e;
    }
  }
}
