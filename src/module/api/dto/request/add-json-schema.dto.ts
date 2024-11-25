import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const AddJsonSchemaDtoSchema = z.object({
  name: z.string(),
  schema: z.any(),
  metadata: z.any().optional(),
});

export class AddJsonSchemaDto extends createZodDto(AddJsonSchemaDtoSchema) {}
