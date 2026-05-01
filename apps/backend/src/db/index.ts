import {drizzle} from 'drizzle-orm/bun-sql';
import {SQL} from 'bun';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString)
  throw new Error('DATABASE_URL is not set');


const client = new SQL(connectionString);
export const db = drizzle(client, {schema});