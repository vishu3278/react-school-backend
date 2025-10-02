import express from "express";
import { getAllClasses, createClass } from "../controllers/classConroller.js";

const router = express.Router();

router.get('/getall', getAllClasses);
router.post('/', createClass);
router.put('/update', updateClass);

export default router;


