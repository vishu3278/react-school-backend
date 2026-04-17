import express from "express";
import { 
  createFeeStructure, 
  getAllFeeStructures, 
  updateFeeStructure, 
  deleteFeeStructure 
} from "../controllers/feesController.js";

const router = express.Router();

router.post("/", createFeeStructure);
router.get("/getall", getAllFeeStructures);
router.put("/:id", updateFeeStructure);
router.delete("/:id", deleteFeeStructure);

export default router;