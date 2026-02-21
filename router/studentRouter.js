import express from "express";
import { getAllStudents, createStudent, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

router.get('/getall', getAllStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);


export default router;


