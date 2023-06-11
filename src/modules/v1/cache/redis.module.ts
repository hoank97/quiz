import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis.services';
import { RedisConfig } from 'src/configs';

@Module({
  imports: [
    CacheModule.register({
      ...RedisConfig,
      store: redisStore,
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
