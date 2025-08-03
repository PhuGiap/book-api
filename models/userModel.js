const pool = require('../db');

// Get all users
exports.getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY id');
  return result.rows;
};

// Get a user by ID
exports.getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

// Create a new user
exports.createUser = async ({ name, email, role }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, role, createdat) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [name, email, role]
  );
  return result.rows[0];
};

// Update a user
exports.updateUser = async (id, { name, email, role }) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, role = $3
     WHERE id = $4
     RETURNING *`,
    [name, email, role, id]
  );
  return result.rows[0];
};

// Delete a user
exports.deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
