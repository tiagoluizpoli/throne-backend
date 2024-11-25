import { JsonSchemaRepository } from '@/infra/persistence/repositories/json-schema.repository';
import { JsonSchema } from '@/module/domain';
import { Injectable } from '@nestjs/common';

interface AddJsonSchemaParams {
  name: string;
  schema: object;
  metadata?: object;
}

@Injectable()
export class AddJsonSchemaService {
  constructor(private readonly jsonSchemaRepository: JsonSchemaRepository) {}

  async execute({ name, schema, metadata }: AddJsonSchemaParams): Promise<void> {
    const jsonSchema = JsonSchema.create({
      name,
      schema,
      metadata,
    });

    await this.jsonSchemaRepository.insert(jsonSchema);
  }
}
