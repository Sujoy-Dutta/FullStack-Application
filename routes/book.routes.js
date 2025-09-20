import express from 'express';
import * as controller from '../controller/book.controller.js';
const router = express.Router();

router.get('/', controller.getAllBooks);
router.post('/', controller.createBook);
router.get('/:id', controller.getBookById);
router.delete('/:id', controller.deleteBook);

export default router;