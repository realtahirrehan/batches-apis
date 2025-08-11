import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
    {
        codes: {
            type: [String],
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Batches = mongoose.model('Batches', batchSchema);