import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { initLogger } from './logger.factory';

type ContextType = Record<string, unknown> & { exception?: unknown };

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = initLogger('application');
  }

  private getDefaultFields(exception?: unknown) {
    const { originClass: callerClass, originMethod: callerMethod } = this.getCallerContext(exception);

    return {
      defaultContext: {
        originClass: callerClass,
        originMethod: callerMethod,
      },
    };
  }

  /**
   *
   * The caller context consists of the class and method that called the logger.
   * This is useful for debugging and tracing the origin of the log.
   */
  private getCallerContext(exception?: unknown) {
    /**
     * If an exception is passed, we can get the caller from the stack trace of the exception.
     * This is necessary because the stack trace of the exception will be different from the stack trace of the logger.
     */
    if (exception && exception instanceof Error) {
      const caller = exception.stack?.split('\n')[1].trim().split(' ')[1];
      const callerClass = caller?.split('.')[0];
      const callerMethod = caller?.split('.').slice(1).join('.');
      return {
        originClass: callerClass,
        originMethod: callerMethod,
      };
    }
    /**
     * If no exception is passed, we can get the caller from the stack trace of the logger.
     */
    const stack = new Error().stack;
    const caller = stack?.split('\n')[4].trim().split(' ')[1];
    const callerClass = caller?.split('.')[0];
    const callerMethod = caller?.split('.').slice(1).join('.');

    return {
      originClass: callerClass,
      originMethod: callerMethod,
    };
  }

  log(message: string, context: ContextType = {}) {
    const { defaultContext } = this.getDefaultFields(context.exception);
    this.logger.info(this.formatMessage(message, context, defaultContext));
  }

  info(message: string, context: ContextType = {}) {
    const { defaultContext } = this.getDefaultFields(context.exception);
    this.logger.info(this.formatMessage(message, context, defaultContext));
  }

  error(message: string, context: ContextType = {}) {
    const { defaultContext } = this.getDefaultFields(context.exception);
    this.logger.error(this.formatMessage(message, context, defaultContext));
  }

  warn(message: string, context: ContextType = {}) {
    const { defaultContext } = this.getDefaultFields(context.exception);
    this.logger.warn(this.formatMessage(message, context, defaultContext));
  }

  debug(message: string, context: ContextType = {}) {
    const { defaultContext } = this.getDefaultFields(context.exception);
    this.logger.debug(this.formatMessage(message, context, defaultContext));
  }

  verbose(message: string, context: ContextType = {}) {
    const { defaultContext } = this.getDefaultFields(context.exception);
    this.logger.verbose(this.formatMessage(message, context, defaultContext));
  }

  fatal(message: string, context: ContextType = {}) {
    const { defaultContext } = this.getDefaultFields(context.exception);
    this.logger.error(this.formatMessage(message, context, defaultContext));
  }

  private formatMessage(
    message: string,
    context: ContextType,
    defaultContext: { originClass: string | undefined; originMethod: string | undefined },
  ) {
    const prefix = defaultContext.originClass ? `${defaultContext.originClass}.${defaultContext.originMethod} :: ` : '';
    const sufix = Object.keys(context).length > 0 ? ` :: ${JSON.stringify(context)}` : '';

    return `${prefix}${message}${sufix}`;
  }
}
