import mongoose from "mongoose";
import validator from "validator";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

export const Subject = mongoose.model('Subjects', subjectSchema);





