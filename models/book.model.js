import { pgTable, varchar, timestamp, uuid, text, index } from 'drizzle-orm/pg-core';
import { authorTable } from './author.model.js';
import { sql } from 'drizzle-orm';

export const booksTable = pgTable('books', 
    {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 255}).notNull(),
    authorId: uuid().references(() => authorTable.id).notNull(),
    description: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
    }, (table) => ({
        seachIndexOnTitle: index("title_index").using(
            "gin",
            sql`to_tsvector('english', ${table.title})`
        )
    })
);