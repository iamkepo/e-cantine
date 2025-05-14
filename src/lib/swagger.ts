import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API - Cantine',
    version: '1.0.0',
    description: 'Documentation API pour la gestion des utilisateurs et des plats',
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local API Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/app/api/v1/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;