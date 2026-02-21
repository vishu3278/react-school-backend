import { Announcement } from "../models/announcementSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAnnouncement = async (req, res, next) => {
  console.log(req.body);
  const { announcement } = req.body;
  try {
    if (!announcement) {
      return res.status(400).json({ success: false, message: "Please fill the announcement field" });
    }
    const newAnnouncement = await Announcement.create({ announcement });
    res.status(200).json({
      success: true,
      message: "Announcement Created!",
      announcement: newAnnouncement,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({
      success: true,
      announcements,
    });
  } catch (err) {
    next(err);
  }
};



