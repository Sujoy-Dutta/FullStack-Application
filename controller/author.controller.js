import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { authorTable } from '../models/author.model.js'
import { booksTable } from '../models/book.model.js';

export const getAllAuthors = async(req, res) => {
    const authors = await db.select().from(authorTable);
    return res.json(authors);
}

export const authorById = async(req, res) => {
    console.log(req.params)
    const author = await db
        .select()
        .from(authorTable)
        .where(eq(authorTable.id, req.params.id))

    if(!author) {
        return res.status(404).json({error: `Author with ID ${req.params.id} does not exists!`});
    }

    return res.json(author);
}

export const createAuthor = async (req, res) => {
    const {name, email} = req.body;

    const [result] = await db.insert(authorTable).values({
        name,
        email
    })
    .returning({id: authorTable.id})

    return res.json({ message: "Author has been create successfully", id: result.id})
}

export const getBookByAuthor = async(req, res) => {
    const book = await db.select().from(booksTable).where(eq(booksTable.authorId, req.params.id))
    return res.json(book);
}