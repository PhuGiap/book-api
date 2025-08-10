const BookModel = require('../models/bookModel');

const safeFormatDate = (date) =>
  date ? new Date(date).toISOString().split('T')[0] : null;

const formatDate = (book) => ({
  ...book,
  created_at: safeFormatDate(book.created_at),
  updated_at: safeFormatDate(book.updated_at),
});

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.getAll();
    const formattedBooks = books.map(formatDate);
    res.json(formattedBooks);
  } catch (err) {
    console.error('Error getting books:', err);
    res.status(500).json({ message: 'Failed to get books' });
  }
};

// GET a single book by ID
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.getById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(formatDate(book));
  } catch (err) {
    console.error('Error getting book by ID:', err);
    res.status(500).json({ message: 'Failed to get book' });
  }
};

// CREATE a new book
exports.createBook = async (req, res) => {
  try {
    const book = await BookModel.create(req.body);
    res.status(201).json(formatDate(book));
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ message: 'Failed to create book' });
  }
};

// UPDATE a book by ID
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await BookModel.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json(formatDate(updated));
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ message: 'Failed to update book' });
  }
};

// DELETE a book by ID
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await BookModel.delete(id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Successfully deleted', deleted: formatDate(deleted) });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ message: 'Failed to delete book' });
  }
};
