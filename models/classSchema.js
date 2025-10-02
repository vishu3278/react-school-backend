import mongoose from "mongoose";
import validator from "validator";

const classSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true
  },
  subjects: {
    type: Array,
  }
});


export const Class = mongoose.model('Classes', classSchema);





