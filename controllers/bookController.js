const pool = require('../db');
const { formatBookResponse } = require('../helpers/format');

// GET all books with pagination
exports.getAllBooks = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const totalResult = await pool.query('SELECT COUNT(*) FROM books');
    const totalItems = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      status: 'success',
      data: result.rows.map(formatBookResponse),
      pagination: {
        page,
        limit,
        totalItems,
        totalPages
      }
    });
  } catch (err) {
    console.error('Error in getAllBooks:', err);
    next(err);
  }
};

// GET book by ID
exports.getBookById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    }
    res.json({
      status: 'success',
      data: formatBookResponse(result.rows[0])
    });
  } catch (error) {
    console.error('Error in getBookById:', error);
    next(error);
  }
};

// POST create new book
exports.createBook = async (req, res, next) => {
  const { title, author, publishedDate, pages, genre, summary } = req.body;
  if (!title || !author || !publishedDate || !pages || !genre || !summary) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, published_date, pages, genre, summary, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
      [title, author, publishedDate, pages, genre, summary]
    );
    res.status(201).json({
      status: 'success',
      data: formatBookResponse(result.rows[0])
    });
  } catch (error) {
    console.error('Error in createBook:', error);
    next(error);
  }
};

// PUT update book
exports.updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, publishedDate, pages, genre, summary } = req.body;
  if (!title || !author || !publishedDate || !pages || !genre || !summary) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }
  try {
    const result = await pool.query(
      `UPDATE books SET title = $1, author = $2, published_date = $3, pages = $4, genre = $5, summary = $6, updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [title, author, publishedDate, pages, genre, summary, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    }
    res.json({
      status: 'success',
      data: formatBookResponse(result.rows[0])
    });
  } catch (error) {
    console.error('Error in updateBook:', error);
    next(error);
  }
};

// DELETE book
exports.deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    }
    res.json({
      status: 'success',
      message: 'Book deleted successfully',
      data: formatBookResponse(result.rows[0])
    });
  } catch (error) {
    console.error('Error in deleteBook:', error);
    next(error);
  }
};
