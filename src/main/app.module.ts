import { ApiModule } from '@/module/api/api.module';
import { Module } from '@nestjs/common';
import { DEFAULT_HTTP_MODULE_PROVIDERS, MODULES, SHARED_MODULES } from './constant';

@Module({
  imports: [...SHARED_MODULES, ...MODULES, ApiModule],
  controllers: [],
  providers: [...DEFAULT_HTTP_MODULE_PROVIDERS],
})
export class AppModule {}
