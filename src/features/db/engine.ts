import { PGlite } from '@electric-sql/pglite';
import { rootSchema } from './schema';

class Database {
  constructor(public config: any) {}
}

class PGLiteAdapter {
  constructor(public config: any) {}
}

export const pglite = new PGlite();

export const db = new Database({
  adapter: new PGLiteAdapter(pglite) as any,
  schema: rootSchema, // Resolves the instance error
});