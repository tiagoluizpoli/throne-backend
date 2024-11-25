import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { JsonSchemaController } from './json-schema.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [JsonSchemaController],
})
export class ApiModule {}
