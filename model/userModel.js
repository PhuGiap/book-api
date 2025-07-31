const pool = require('../db');

const UserModel = {
  getAll: async () => {
    const result = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY id ASC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  getByEmail: async (email) => {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  create: async ({ name, email, password, role = 'user' }) => {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at`,
      [name, email, password, role]
    );
    return result.rows[0];
  },

  update: async (id, { name, email, role }) => {
    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2, role = $3
       WHERE id = $4 RETURNING id, name, email, role, created_at`,
      [name, email, role, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, name, email, role, created_at',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = UserModel;
