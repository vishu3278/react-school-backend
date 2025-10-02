import express from "express";
import { getAllSubjects, createSubject } from "../controllers/subjectController.js";

const router = express.Router();

router.get('/getall', getAllSubjects);
router.post('/', createSubject);

export default router;


