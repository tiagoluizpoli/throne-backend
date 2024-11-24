import { z } from 'zod'

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const environmentSchema = z.nativeEnum(Environment)

export const applicationSchema = z.object({
  env: environmentSchema,
  port: z.coerce.number().positive().int(),
})

export const databaseSchema = z.object({
  url: z.string(),
})

export const configSchema = z.object({
  application: applicationSchema,
  database: databaseSchema,
})
