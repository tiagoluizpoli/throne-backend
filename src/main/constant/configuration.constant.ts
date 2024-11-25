import { ConfigModule } from '@/main/config/config.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from '../interceptor';
import { LoggerModule } from '../logger/logger.module';
import { ZodValidationPipe } from '../pipe';

export const SHARED_MODULES = [ConfigModule.forRoot()];

export const HTTP_VALIDATION_PIPES = [
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },
];

export const HTTP_INTERCEPTORS = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ZodSerializerInterceptor,
  },
];

export const DEFAULT_HTTP_MODULE_PROVIDERS = [...HTTP_INTERCEPTORS, ...HTTP_VALIDATION_PIPES];

export const MODULES = [ConfigModule.forRoot(), LoggerModule];
