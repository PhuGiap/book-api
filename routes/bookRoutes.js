const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API quản lý sách
 */

router.get('/books', bookController.getAllBooks);

router.get('/books/:id', bookController.getBookById);

router.post('/books', bookController.createBook);

router.put('/books/:id', bookController.updateBook);

router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
