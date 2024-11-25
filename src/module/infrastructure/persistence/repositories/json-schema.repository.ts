import { JsonSchema as jsonSchemaEntity } from '@/module/domain';
import { Inject, Injectable } from '@nestjs/common';
import { jsonSchema } from '../drizzle/drizle.schema';
import { DRIZZLE, DrizzleDB } from '../drizzle/types/drizzle';

@Injectable()
export class JsonSchemaRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async insert(data: jsonSchemaEntity) {
    const teste = await this.db.insert(jsonSchema).values({
      name: data.name,
      schema: data.schema,
      metadata: data.metadata,
    });
  }
}
