import mongoose from "mongoose";
import validator from "validator";
import { Counter } from "./counterSchema.js";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: Number,
    unique: true,
    immutable: true
  },
  grade: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  phone1: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        const s = v.toString();
        return s.length === 10 || s.length === 1;
      },
      message: props => `${props.value} is not a valid phone number! It must be exactly 10 digits or 1 digit.`
    }
  },
  phone2: {
    type: Number,
    required: false,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return v.toString().length === 10;
      },
      message: props => `${props.value} is not a valid phone number! It must be exactly 10 digits.`
    }
  },
  aadharNumber: {
    type: Number,
    unique: true,
    sparse: true
  },
  address: {
    type: String,
    required: true
  },
  rollNumber: {
    type: Number
  },
  religion: {
    type: String,
    enum: ["Hindu", "Muslim", "Sikh", "Jain", "Baudh", "Christian", "Other", "--"],
    default: "--"
  },
  occupation: {
    type: String
  },
});

/* 
studentSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { id: 'studentRegistrationNumber' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Format to sequential unique number
    this.registrationNumber = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
}); */

studentSchema.pre('validate', async function (next) {
  if (!this.isNew || this.registrationNumber) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { id: 'studentRegistrationNumber' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Format to 6-digit sequential unique number (e.g., 000001)
    this.registrationNumber = counter.seq.toString().padStart(6, '0');
    next();
  } catch (error) {
    next(error);
  }
});

export const Student = mongoose.model('Student', studentSchema);



