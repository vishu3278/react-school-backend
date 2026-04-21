import { Student } from "../models/studentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { name, grade, dob, motherName, fatherName, phone1, phone2, aadharNumber, address, rollNumber, religion, occupation } = req.body;
  try {
    if (!name || !grade || !motherName || !fatherName || !phone1 || !address) {
      return res.status(400).json({ 
        success: false, 
        message: "Please fill all mandatory fields (Name, Grade, DOB, Parents' Names, Phone 1, and Address)" 
      });
    }
    const student = await Student.create({ 
      name, grade, dob, motherName, fatherName, phone1, phone2, aadharNumber, address, rollNumber, religion, occupation 
    });
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
  const { name, grade, dob, motherName, fatherName, phone1, phone2, aadharNumber, address, rollNumber, religion, occupation } = req.body;
  try {
    let student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    student = await Student.findByIdAndUpdate(id, {
      name, grade, dob, motherName, fatherName, phone1, phone2, aadharNumber, address, rollNumber, religion, occupation
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



