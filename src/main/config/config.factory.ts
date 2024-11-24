import { ConfigException } from './config.exception'
import { configSchema } from './config.schema'
import { Config } from './config.type'

export const factory = (): Config => {
  const result = configSchema.safeParse({
    application: {
      env: process.env.NODE_ENV,
      port: process.env.PORT,
    },
    database: {
      url: process.env.DATABASE_URL,
    },
  })

  if (result.success) {
    return result.data
  }

  throw new ConfigException(`Invalid application configuration: ${result.error.message}`)
}
