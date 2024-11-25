import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AddJsonSchemaService } from '../application/services/add-json-schema.service';
import { AddJsonSchemaDto } from './dto';

@Controller('json-schema')
export class JsonSchemaController {
  constructor(private readonly addJsonSchemaService: AddJsonSchemaService) {}

  @HttpCode(201)
  @Post()
  async addJsonSchema(@Body() { name, schema, metadata }: AddJsonSchemaDto) {
    await this.addJsonSchemaService.execute({
      name,
      schema,
      metadata,
    });
  }
}
