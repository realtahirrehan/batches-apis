import { Router } from "express";
import { createBatches, getBatchById, getBatches } from "../controllers/batches.controller.js";

const router = Router();

/**
 * @swagger
 * /api/batches:
 *   get:
 *     summary: Get all batches
 *     tags:
 *       - Batches
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/batches', getBatches);

/**
 * @swagger
 * /api/batches/{id}:
 *   get:
 *     summary: Get a batch by ID
 *     tags:
 *       - Batches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the batch to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Batch not found
 */
router.get('/batches/:id', getBatchById);

/**
 * @swagger
 * /api/batches:
 *   post:
 *     summary: Create a new batch
 *     tags:
 *       - Batches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Batch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid batch data
 */
router.post('/batches', createBatches);

export default router;