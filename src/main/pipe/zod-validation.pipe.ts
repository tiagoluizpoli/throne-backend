import { ZodDtoStatic } from '@anatine/zod-nestjs'
import { ArgumentMetadata, BadRequestException, Injectable, Optional, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(@Optional() private readonly schema?: ZodSchema | ZodDtoStatic) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (this.schema) {
      return this.validate(value, this.getZodSchema(this.schema))
    }

    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema

    if (zodSchema) {
      return this.validate(value, zodSchema as ZodSchema)
    }

    return value
  }

  private async validate(value: unknown, schema: ZodSchema) {
    const parsedValue = await schema.safeParseAsync(value)

    if (parsedValue.success) {
      return parsedValue.data
    }

    throw new BadRequestException({
      message: 'Bad request',
      details: parsedValue.error.flatten().fieldErrors,
    })
  }

  private getZodSchema(schema: ZodSchema | ZodDtoStatic): ZodSchema {
    if ((schema as ZodDtoStatic).zodSchema) {
      return (schema as ZodDtoStatic).zodSchema as ZodSchema
    }

    return schema as ZodSchema
  }
}
