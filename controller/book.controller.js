import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { booksTable } from '../models/book.model.js';

export const getAllBooks = async (req, res) => {
    const allBooks = await db.select().from(booksTable);
    return res.json(allBooks);
};

export const getBookById = async (req, res) =>{
    const id = req.params.id;
    const [book] = await db.select().from(booksTable).where((table) => eq(table.id, id));

    if (!book) {
        return res.status(400).json({ error: `Book with id:${id} does not exists!`})
    }
    return res.json(book);
}

export const createBook = async(req, res) => {
    const {title, authorId, description} = req.body;
    console.log(title, authorId, description)
    const [newBook] = await db.insert(booksTable).values({
        title: title,
        authorId: authorId,
        description: description
    }).returning({
        id: booksTable.id
    });
    return res.status(201).json({message : "Book created successfully", id: newBook.id})
}

export const deleteBook = async (req, res) =>{
    const id = req.param.id;

    await db.delete(booksTable).where(eq(booksTable.id === id))
    return res.status(200).json({ message: "Book deleted successfully!"});
}