import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
    unique: true
  },
  tuitionFee: {
    type: Number,
    required: true,
    min: [0, "Tuition fee cannot be negative"]
  },
  admissionFee: {
    type: Number,
    default: 0,
    min: [0, "Admission fee cannot be negative"]
  },
  otherFees: {
    type: Map,
    of: Number,
    default: {}
  }
}, { timestamps: true });

export const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);