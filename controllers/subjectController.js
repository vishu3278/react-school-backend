import {  Subject } from "../models/subjectSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createSubject = async (req, res, next) => {
  console.log(req.body);
  const { name } = req.body;
  try {
    if (!name ) {
      handleValidationError("Please Fill Form!", 400);
  }
  await Subject.create({ name });
  res.status(200).json({
    success: true,
    message: "Subject Created!",
  }); 
  } catch (err) {
    next(err);
  }
};

export const getAllSubjects = async (req, res, next) => {
  try {
  const subjects = await Subject.find();
  res.status(200).json({
    success: true,
    subjects,
  });  
  } catch (err) {
    next(err);
  }
};
 
