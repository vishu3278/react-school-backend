import express from "express";
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "../controllers/announcementConroller.js";

const router = express.Router();

router.get('/getall', getAllAnnouncements);
router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);


export default router; 
