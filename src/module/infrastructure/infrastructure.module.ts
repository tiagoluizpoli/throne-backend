import { DomainModule } from '@/module/domain/domain.module';
import { Module } from '@nestjs/common';
import { DrizzleModule } from './persistence/drizzle/drizzle.module';
import { JsonSchemaRepository } from './persistence/repositories/json-schema.repository';

@Module({
  imports: [DomainModule, DrizzleModule],
  providers: [JsonSchemaRepository],
  exports: [JsonSchemaRepository],
})
export class InfrastructureModule {}
