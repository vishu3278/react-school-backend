import { FeeStructure } from "../models/feesSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createFeeStructure = async (req, res, next) => {
  const { grade, tuitionFee, admissionFee, otherFees } = req.body;
  try {
    if (!grade || tuitionFee === undefined || admissionFee === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Grade, tuition fee, and admission fee are required" 
      });
    }

    const existingFee = await FeeStructure.findOne({ grade });
    if (existingFee) {
      return res.status(400).json({ 
        success: false, 
        message: "Fee structure for this grade already exists" 
      });
    }

    const feeStructure = await FeeStructure.create({ 
      grade, 
      tuitionFee, 
      admissionFee, 
      otherFees 
    });

    res.status(201).json({
      success: true,
      message: "Fee Structure Created!",
      feeStructure,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllFeeStructures = async (req, res, next) => {
  try {
    const feeStructures = await FeeStructure.find();
    res.status(200).json({
      success: true,
      feeStructures,
    });
  } catch (err) {
    next(err);
  }
};

export const updateFeeStructure = async (req, res, next) => {
  const { id } = req.params;
  try {
    let feeStructure = await FeeStructure.findById(id);
    if (!feeStructure) {
      return res.status(404).json({ success: false, message: "Fee structure not found" });
    }

    // Handle partial updates
    if (!req.body.grade && !req.body.tuitionFee && !req.body.admissionFee && !req.body.otherFees) {
      return res.status(400).json({ success: false, message: "No fields to update" });
    }

    feeStructure = await FeeStructure.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Fee Structure Updated!",
      feeStructure,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFeeStructure = async (req, res, next) => {
  const { id } = req.params;
  try {
    const feeStructure = await FeeStructure.findById(id);
    if (!feeStructure) {
      return res.status(404).json({ success: false, message: "Fee structure not found" });
    }

    await feeStructure.deleteOne();
    res.status(200).json({
      success: true,
      message: "Fee Structure Deleted!",
    });
  } catch (err) {
    next(err);
  }
};