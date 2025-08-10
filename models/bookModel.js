const pool = require('../db');

const BookModel = {
  async getAll() {
    const result = await pool.query('SELECT * FROM books ORDER BY id ASC');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(data) {
    const { title, author, pages, genre, summary } = data;
    const result = await pool.query(
      `INSERT INTO books (title, author, pages, genre, summary, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, CURRENT_DATE) RETURNING *`,
      [title, author, pages, genre, summary]
    );
    return result.rows[0];
  },

  async update(id, data) {
    const { title, author, pages, genre, summary } = data;
    const result = await pool.query(
      `UPDATE books
       SET title = $1, author = $2, pages = $3, genre = $4, summary = $5, updated_at = CURRENT_DATE
       WHERE id = $6 RETURNING *`,
      [title, author, pages, genre, summary, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = BookModel;
