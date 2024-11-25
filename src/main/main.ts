import { ConfigService } from '@/main/config/config.service';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(json({ limit: '10mb' }));

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('application.port');

  await app.listen(port);
}
bootstrap();
