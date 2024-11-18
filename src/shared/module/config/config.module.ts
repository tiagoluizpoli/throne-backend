import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, ConfigModuleOptions as NestConfigModuleOptions } from '@nestjs/config'
import { factory } from './config.factory'
import { ConfigService } from './config.service'

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options?: NestConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          ...options,
          expandVariables: true,
          load: options?.load ? [factory, ...options.load] : [factory],
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    }
  }
}
