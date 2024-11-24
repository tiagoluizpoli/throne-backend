import { ZodDtoStatic } from '@anatine/zod-nestjs';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  SetMetadata,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ZodSchema } from 'zod';
import { Environment } from '../config/config.schema';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';

// NOTE (external)
// We need to deduplicate them here due to the circular dependency
// between core and common packages
const REFLECTOR = 'Reflector';

export const ZodSerializerDtoOptions = 'ZOD_SERIALIZER_DTO_OPTIONS' as const;

export const ZodSerializerDto = (dto: ZodSchema | ZodDtoStatic) => SetMetadata(ZodSerializerDtoOptions, dto);

@Injectable()
export class ZodSerializerInterceptor<T extends object> implements NestInterceptor<unknown, T> {
  constructor(
    // biome-ignore lint/suspicious/noExplicitAny: any is required by NestJS
    @Inject(REFLECTOR) protected readonly reflector: any,
    private configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const responseSchema = this.getContextResponseSchema(context);

    return next.handle().pipe(
      switchMap(async (data) => {
        if (!responseSchema || typeof data !== 'object' || data instanceof StreamableFile) return data;

        const schema = this.getZodSchema(responseSchema);

        const parsedData = await schema.safeParseAsync(data);

        if (parsedData.success) {
          return parsedData.data;
        }

        const isProduction = this.configService.get('application.env') === Environment.PRODUCTION;

        this.logger.error('Response validation failed', { ...parsedData.error });

        if (!isProduction) {
          throw new InternalServerErrorException({
            message: 'Response validation failed',
            details: parsedData.error,
          });
        }

        throw new InternalServerErrorException({
          message: 'Response validation failed',
        });
      }),
    );
  }

  protected getContextResponseSchema(context: ExecutionContext): ZodSchema | ZodDtoStatic | undefined {
    return this.reflector.getAllAndOverride(ZodSerializerDtoOptions, [context.getHandler(), context.getClass()]);
  }

  private getZodSchema(schema: ZodSchema | ZodDtoStatic): ZodSchema {
    if ((schema as ZodDtoStatic).zodSchema) {
      return (schema as ZodDtoStatic).zodSchema as ZodSchema;
    }

    return schema as ZodSchema;
  }
}
