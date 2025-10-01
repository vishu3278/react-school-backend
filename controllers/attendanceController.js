import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const markAttendance = async (req, res, next) => {
  const { attendanceData } = req.body;
  try {
    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      handleValidationError("Attendance data is missing or invalid!", 400);
    }
    const attendanceRecords = await Promise.all(attendanceData.map(async (record) => {
      const { student, status, date } = record;
      return await Attendance.create({ student, status, date });
    }));
    res.status(200).json({
      success: true,
      message: "Attendance marked successfully!",
      attendanceRecords
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const selectedDate = new Date(req.query.date); // YYYY-MM-DD

    // Get start and end of that day
    const start = new Date(selectedDate.setHours(0,0,0,0));
    const end = new Date(selectedDate.setHours(23,59,59,999));
    // console.log(selectedDate, start, end)

    const attendanceRecords = await Attendance.find({date: { $gte: start, $lte: end }}).populate('student', 'name registrationNumber grade');
    res.status(200).json({
      success: true,
      attendanceRecords
    });
  } catch (err) {
    next(err);
  }
};
