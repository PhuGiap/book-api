const pool = require('../db');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY id');
    res.json({ status: 'success', data: result.rows });
  } catch (error) {
    console.error('❌ Error in getAllBooks:', error.message);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// GET book by ID
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('❌ Error in getBookById:', error.message);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// POST create new book
exports.createBook = async (req, res) => {
  const { title, author, publishedDate, pages, genre, summary } = req.body;

  if (!title || !author || !publishedDate || !pages || !genre || !summary) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const parsedDate = new Date(publishedDate); // Convert to Date
    const result = await pool.query(
      `INSERT INTO books (title, author, published_date, pages, genre, summary, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
      [title, author, parsedDate, pages, genre, summary]
    );
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('❌ Error in createBook:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// PUT update book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedDate, pages, genre, summary } = req.body;

  if (!title || !author || !publishedDate || !pages || !genre || !summary) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const parsedDate = new Date(publishedDate); // Convert to Date
    const result = await pool.query(
      `UPDATE books
       SET title = $1, author = $2, published_date = $3, pages = $4, genre = $5, summary = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [title, author, parsedDate, pages, genre, summary, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    }

    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('❌ Error in updateBook:', error.message);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// DELETE book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Book deleted successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('❌ Error in deleteBook:', error.message);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
