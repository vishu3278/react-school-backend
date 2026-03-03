import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  qualification: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
});

export const TeacherProfile = mongoose.model("TeacherProfile", teacherProfileSchema);

