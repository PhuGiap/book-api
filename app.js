const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const setupSwagger = require('./swagger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Prefix API chuẩn hóa
app.use('/api', bookRoutes);

// Swagger UI
setupSwagger(app);

// Test route
app.get('/', (req, res) => {
  res.send('Book API is running...');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ status: 'error', message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
