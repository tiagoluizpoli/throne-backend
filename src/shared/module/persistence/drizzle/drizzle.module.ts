import { ConfigModule } from '@/sharedModule/config/config.module'
import { ConfigService } from '@/sharedModule/config/config.service'
import { Module } from '@nestjs/common'
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './drizle.schema'

export const DRIZZLE = Symbol('drizzle-connection')

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get('database.url')

        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: true,
        })

        const db = drizzle(pool, {
          schema,
        })

        return db as NodePgDatabase<typeof schema>
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
