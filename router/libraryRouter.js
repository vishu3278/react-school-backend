import express from "express";
import { getAllBooks, createBook, updateBook } from "../controllers/libraryConroller.js";

const router = express.Router();

router.get('/getall', getAllBooks);
router.post('/books', createBook);
router.put('/books/update', updateBook);


export default router;


