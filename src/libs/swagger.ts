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
      url: process.env.NEXT_PUBLIC_API_URL,
      description: process.env.NODE_ENV == 'development' ? 'Local API Server' : 'Online API Server',
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