const express = require('express');
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');
const setupSwagger = require('./swagger'); // ✅ Sửa ở đây

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use('/api', bookRoutes);

setupSwagger(app); 
app.get('/', (req, res) => {
  res.send('Book API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
