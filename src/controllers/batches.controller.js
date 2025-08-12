import mongoose from "mongoose";
import { Batches } from "../models/batches.js";

export const createBatches = async (req, res) => {
    try {
        const { codes, product_name, product_description, quantity } = req.body;
        if (!codes || !Array.isArray(codes)) {
            return res.status(400).json({ message: 'Invalid batch data' });
        }

        const existingBatches = await Batches.find({ codes: { $in: codes } });
        if (existingBatches.length > 0) {
            const existingCodes = new Set();
            existingBatches.forEach(batch => {
                batch.codes.forEach(code => {
                    if (codes.includes(code)) {
                        existingCodes.add(code);
                    }
                });
            });

            if (existingCodes.size > 0) {
                return res.status(400).json({
                    message: 'These codes already exist in other batches.',
                    data: Array.from(existingCodes)
                });
            }
        }

        const newBatch = new Batches({ codes, product_name, product_description, quantity });
        await newBatch.save();

        res.status(201).json({ message: 'Batch created successfully', data: newBatch });
    } catch (error) {
        console.error('Error creating batch:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: `Batch with these codes already exists: ${error.keyValue.codes}` });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const getBatches = async (req, res) => {
    try {
        const batches = await Batches.find();
        if (!batches || batches.length === 0) {
            return res.status(404).json({ message: 'No batches found' });
        }

        res.status(200).json({ message: 'Batches retrieved successfully', data: batches });
    } catch (error) {
        console.error('Error retrieving batches:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getBatchById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Batch ID is required' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Batch ID format' });
        }

        const batch = await Batches.findById(id);
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        res.status(200).json({ message: 'Batch retrieved successfully', data: batch });
    } catch (error) {
        console.error('Error retrieving batch:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
