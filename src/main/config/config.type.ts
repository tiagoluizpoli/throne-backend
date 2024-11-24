import { z } from 'zod'
import { configSchema, databaseSchema, environmentSchema } from './config.schema'

export type EnvironmentConfig = z.infer<typeof environmentSchema>
export type DatabaseConfig = z.infer<typeof databaseSchema>

export type Config = z.infer<typeof configSchema>
