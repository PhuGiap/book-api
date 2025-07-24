const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

console.log('✅ bookRoutes.js loaded');
router.get('/books', controller.getAllBooks);
router.get('/books/:id', controller.getBookById);
router.post('/books', controller.createBook);
router.put('/books/:id', controller.updateBook);
router.delete('/books/:id', controller.deleteBook);

module.exports = router;
