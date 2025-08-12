import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: true,
        },
        product_description: {
            type: String,
            required: true,
        },
        codes: {
            type: [String],
            required: true,
            unique: true
        },
        quantity: {
            type: Number,
        }
    },
    {
        timestamps: true
    },
    {
        indexes: [
            {
                fields: { codes: 1 },
                options: { unique: true }
            },

        ]
    }
)

export const Batches = mongoose.model('Batches', batchSchema);