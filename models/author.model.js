import { pgTable, serial, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const authorTable = pgTable('authors', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique()
})