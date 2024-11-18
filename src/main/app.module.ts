import { INFRASTRUCTURE_MODULES } from '@/shared'
import { Module } from '@nestjs/common'

@Module({
  imports: [...INFRASTRUCTURE_MODULES],
  controllers: [],
  providers: [],
})
export class AppModule {}
