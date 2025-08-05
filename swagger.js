const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'A simple RESTful API for managing books and users',
    },
    servers: [
      {
        url: 'https://book-api-1-98o3.onrender.com/api',
        description: 'Production server',
      },
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        // 📚 Book Schemas
        Book: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Clean Code' },
            author: { type: 'string', example: 'Robert C. Martin' },
            published_date: { type: 'string', format: 'date', example: '2008-08-01' },
            pages: { type: 'integer', example: 350 },
            genre: { type: 'string', example: 'Software Engineering' },
            summary: { type: 'string', example: 'A handbook of agile software craftsmanship.' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        BookInput: {
          type: 'object',
          required: ['title', 'author', 'publishedDate', 'pages', 'genre', 'summary'],
          properties: {
            title: { type: 'string', example: 'Clean Code' },
            author: { type: 'string', example: 'Robert C. Martin' },
            publishedDate: { type: 'string', format: 'date', example: '2008-08-01' },
            pages: { type: 'integer', example: 350 },
            genre: { type: 'string', example: 'Software Engineering' },
            summary: { type: 'string', example: 'A handbook of agile software craftsmanship.' },
          },
        },

        // 👤 User Schemas
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            role: { type: 'string', example: 'user' },
            createdat: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'role'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            role: { type: 'string', example: 'user' },
          },
        },
      },
    },
    tags: [
      {
        name: 'Books',
        description: 'API quản lý sách',
      },
      {
        name: 'Users',
        description: 'API quản lý người dùng',
      },
    ],
  },
  apis: [
  path.join(__dirname, './routes/bookRoutes.js'),
  path.join(__dirname, './routes/userRoutes.js'),
] 
};
const swaggerSpec = swaggerJsDoc(options);
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger UI path:', '/api-docs');

};

module.exports = setupSwagger;
