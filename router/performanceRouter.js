import express from "express";
import { getAllPerformance, createPerformance } from "../controllers/performanceController.js";

const router = express.Router();

router.get("/getall", getAllPerformance);
router.post("/", createPerformance);

export default router;
