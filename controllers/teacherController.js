import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createTeacher = async (req, res, next) => {
  console.log(req.body);
  const { name, email, mobile, subject, status } = req.body;
  try {
    if (!name || !mobile || !subject) {
      return res.status(400).json({ success: false, message: "Name, Mobile, and Subject are required" });
    }
    const sanitizedEmail = email && email.trim() !== "" ? email.trim() : undefined;
    const newTeacher = await Teacher.create({ name, email: sanitizedEmail, mobile, subject, status: status || 'active' });
    res.status(200).json({
      success: true,
      message: "Teacher Created!",
      teacher: newTeacher,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTeacher = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, mobile, subject, status } = req.body;
  try {
    let teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    const sanitizedEmail = email && email.trim() !== "" ? email.trim() : undefined;

    teacher = await Teacher.findByIdAndUpdate(id, {
      name, email: sanitizedEmail, mobile, subject, status
    }, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Teacher Updated!",
      teacher,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};


