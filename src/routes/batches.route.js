import { Router } from 'express';
import { createBatches, getBatchById, getBatches } from '../controllers/batches.controller.js';

const router = Router();

router.get('/batches', getBatches)
router.get('/batches/:id', getBatchById);
router.post('/batches', createBatches);

export default router;