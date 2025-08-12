import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';
import batchesRoutes from './src/routes/batches.route.js';
import { swaggerSpec, swaggerUi } from './src/config/swagger.js';
import { publicAuthMiddleware } from './src/middleware/public-auth.middleware.js';

dotenv.config()

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use('/swagger/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
app.use('/api', publicAuthMiddleware, batchesRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Batches API is running' });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    console.log(`SwaggerAPI documentation at http://localhost:${port}/swagger/api-docs`);
})