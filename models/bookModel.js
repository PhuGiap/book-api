// models/bookModel.js
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
    const { title, author, publishedDate, pages, genre, summary } = data;
    const result = await pool.query(
      `INSERT INTO books (title, author, publishedDate, pages, genre, summary)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, author, publishedDate, pages, genre, summary]
    );
    return result.rows[0];
  },

  async update(id, data) {
    const { title, author, publishedDate, pages, genre, summary } = data;
    const result = await pool.query(
      `UPDATE books
       SET title = $1, author = $2, publishedDate = $3, pages = $4, genre = $5, summary = $6
       WHERE id = $7 RETURNING *`,
      [title, author, publishedDate, pages, genre, summary, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = BookModel;
