const pool = require('../db');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY id');
    res.json({ status: 'success', data: result.rows });
  } catch (error) {
    console.log(error);
    console.error('❌ Error in getAllBooks:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// GET book by ID
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.log(error);
    console.error('❌ Error in getBookById:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// POST create book
exports.createBook = async (req, res) => {
  const { title, author, publishedDate, genre, summary } = req.body;
  if (!title || !author || !publishedDate || !genre || !summary)
    return res.status(400).json({ status: 'error', message: 'Invalid input data' });

  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, published_date, genre, summary, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [title, author, publishedDate, genre, summary]
    );
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.log(error);
    console.error('❌ Error in createBook:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// PUT update book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedDate, genre, summary } = req.body;
  if (!title || !author || !publishedDate || !genre || !summary)
    return res.status(400).json({ status: 'error', message: 'Invalid input data' });

  try {
    const result = await pool.query(
      `UPDATE books SET title=$1, author=$2, published_date=$3, genre=$4, summary=$5, updated_at=NOW()
       WHERE id=$6 RETURNING *`,
      [title, author, publishedDate, genre, summary, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.log(error);
    console.error('❌ Error in updateBook:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// DELETE book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM books WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    res.json({ status: 'success', message: 'Book deleted' });
  } catch (error) {
    console.log(error);
    console.error('❌ Error in deleteBook:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
