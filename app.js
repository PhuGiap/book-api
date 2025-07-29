const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const setupSwagger = require('./swagger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route API
app.use('/api', bookRoutes);

// Swagger UI
setupSwagger(app);

// Root
app.get('/', (req, res) => {
  res.send('Book API is running...');
});

// Middleware bắt lỗi toàn cục (sau các route)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ status: 'error', message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
