import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: undefined,
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

teacherSchema.index({ email: 1 }, { name: 'unique_email_when_present', partialFilterExpression: { email: { $type: "string" } } });

export const Teacher = mongoose.model('Teacher', teacherSchema);

