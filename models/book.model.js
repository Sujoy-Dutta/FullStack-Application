import { pgTable, varchar, timestamp, uuid, text } from 'drizzle-orm/pg-core';
import { authorTable } from './author.model.js';

export const booksTable = pgTable('books', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 255}).notNull(),
    authorId: uuid().references(() => authorTable.id).notNull(),
    description: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
})