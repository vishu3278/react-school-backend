import { Performance } from "../models/performanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const getAllPerformance = async (req, res, next) => {
    try {
        const performance = await Performance.find();
        res.status(200).json({
            success: true,
            performance,
        });
    } catch (err) {
        next(err);
    }
};

export const createPerformance = async (req, res, next) => {
    const { title, score, totalStudents } = req.body;
    try {
        if (!title || score === undefined) {
            return res.status(400).json({ success: false, message: "Please provide title and score" });
        }
        const newPerformance = await Performance.create({ title, score, totalStudents });
        res.status(200).json({
            success: true,
            message: "Performance record created!",
            performance: newPerformance,
        });
    } catch (err) {
        next(err);
    }
};
