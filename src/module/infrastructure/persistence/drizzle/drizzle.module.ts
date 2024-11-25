import { ConfigModule } from '@/main/config/config.module';
import { ConfigService } from '@/main/config/config.service';
import { Module } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './drizle.schema';
import { DRIZZLE } from './types/drizzle';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get('database.url');

        const pool = new Pool({
          connectionString: databaseUrl,
        });

        const db = drizzle(pool, { schema });

        return db as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
