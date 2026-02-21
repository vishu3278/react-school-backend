import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    totalStudents: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const Performance = mongoose.model("Performance", performanceSchema);
