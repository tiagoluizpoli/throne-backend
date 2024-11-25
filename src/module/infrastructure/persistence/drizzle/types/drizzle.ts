import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizle.schema';

export const DRIZZLE = Symbol('drizzle-connection');
export type DrizzleDB = NodePgDatabase<typeof schema>;
