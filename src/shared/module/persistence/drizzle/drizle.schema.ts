import { boolean, jsonb, pgEnum, pgTable, text, time, uuid, varchar } from 'drizzle-orm/pg-core'

export const tenant = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  code: varchar('code', { length: 40 }).unique().notNull(),
  name: varchar('name', { length: 60 }).notNull(),
  metadata: jsonb('metadata'),
})

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  tenantId: uuid('tenantId')
    .notNull()
    .references(() => tenant.id),
  name: varchar('name', { length: 60 }).notNull(),
  email: varchar('email', { length: 40 }).notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  createdAt: time('createdAt').defaultNow().notNull(),
  updatedAt: time('updatedAt').defaultNow().notNull(),
})

export const jsonSchema = pgTable('jsonSchema', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 60 }).notNull(),
  schema: jsonb('schema'),
  metadata: jsonb('metadata'),
})

export const methodEnum = pgEnum('methodEnum', ['POST', 'PUT', 'GET'])

export const integrations = pgTable('integrations', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 60 }).notNull(),
  method: methodEnum('method').notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  headers: jsonb('headers'),
  sourceSchemaId: uuid('sourceSchemaId')
    .notNull()
    .references(() => jsonSchema.id),
  targetSchemaId: uuid('targetSchemaId')
    .notNull()
    .references(() => jsonSchema.id),
  mappingTemplate: jsonb('mappingTemplate'),
  jsonata: text('jsonata'),
})
