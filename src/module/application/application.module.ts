import { InfrastructureModule } from '@/infra/infrastructure.module';
import { Module } from '@nestjs/common';
import { AddJsonSchemaService } from './services/add-json-schema.service';

@Module({
  imports: [InfrastructureModule],
  providers: [AddJsonSchemaService],
  exports: [AddJsonSchemaService],
})
export class ApplicationModule {}
