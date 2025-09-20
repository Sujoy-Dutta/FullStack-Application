import express from 'express';
import * as authorController  from '../controller/author.controller.js';

const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.authorById);
router.post('/', authorController.createAuthor);
router.get('/:id/books', authorController.getBookByAuthor);

export default router;
