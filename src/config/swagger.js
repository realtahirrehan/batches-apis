import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Batches API',
            version: '1.0.0',
            description: 'API documentation for Batches service',
        },
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'API key authentication'
                }
            }
        },
        security: [
            {
                ApiKeyAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js'], // Path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUi = swaggerUiExpress;
