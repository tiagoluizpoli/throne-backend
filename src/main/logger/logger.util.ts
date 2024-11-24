import { INestApplication } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { initLogger } from './logger.factory';

/**
 * Adds custom logger to the application
 *
 * @param app - The INestApplication instance.
 * @returns The modified INestApplication instance.
 */
export const withLogger = (app: INestApplication): INestApplication => {
  app.useLogger(WinstonModule.createLogger(initLogger('application-main')));

  return app;
};
