const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'A simple RESTful API for managing books',
    },
    servers: [
      {
        url: 'https://book-api-1-98o3.onrender.com/api',
        description: 'Render server',
      },
      {
        url: 'https://your-deploy-url',
        description: 'Deployed server',
      },
    ],
    components: {
      schemas: {
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
          required: ['title', 'author', 'publishedDate', 'genre', 'summary'],
          properties: {
            title: { type: 'string', example: 'Clean Code' },
            author: { type: 'string', example: 'Robert C. Martin' },
            publishedDate: { type: 'string', format: 'date', example: '2008-08-01' },
            genre: { type: 'string', example: 'Software Engineering' },
            summary: { type: 'string', example: 'A handbook of agile software craftsmanship.' },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
