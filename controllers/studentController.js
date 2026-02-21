import { Student } from "../models/studentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { name, registrationNumber, grade, dob, motherName, fatherName, aadharNumber, address, rollNumber } = req.body;
  try {
    if (!name || !registrationNumber || !grade || !dob || !motherName || !fatherName || !aadharNumber || !address || !rollNumber) {
      return next("Please Fill Full Form!", 400);
    }
    const student = await Student.create({ name, registrationNumber, grade, dob, motherName, fatherName, aadharNumber, address, rollNumber });
    res.status(200).json({
      success: true,
      message: "Student Created!",
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const { name, registrationNumber, grade, dob, motherName, fatherName, aadharNumber, address, rollNumber } = req.body;
  try {
    let student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    student = await Student.findByIdAndUpdate(id, {
      name, registrationNumber, grade, dob, motherName, fatherName, aadharNumber, address, rollNumber
    }, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Student Updated!",
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      students,
    });
  } catch (err) {
    next(err);
  }
};



