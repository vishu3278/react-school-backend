import express from "express";

import { createTeacher, getAllTeachers, updateTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.post('/', createTeacher);
router.get('/getall', getAllTeachers);
router.put('/:id', updateTeacher);



export default router;

