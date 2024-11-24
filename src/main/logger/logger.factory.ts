import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import { createLogger, format, transports } from 'winston'

export const initLogger = (appName: string) => {
  const env = process.env.NODE_ENV
  const consoleFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.ms(),
    nestWinstonModuleUtilities.format.nestLike(appName, {
      colors: true,
      prettyPrint: true,
    }),
  )

  const serverFormat = format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), format.ms())

  return createLogger({
    exitOnError: false,
    level: env === 'test' ? 'silent' : 'info',
    transports: [
      new transports.Console({
        format: env === 'development' ? consoleFormat : serverFormat,
      }),
    ],
  })
}
