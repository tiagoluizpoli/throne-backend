import { ApiModule } from '@/module/api/api.module';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SHARED_MODULES } from './constant';

@Module({
  imports: [
    ...SHARED_MODULES,
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
