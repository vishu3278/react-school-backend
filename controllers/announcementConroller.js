import { Announcement } from "../models/announcementSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAnnouncement = async (req, res, next) => {
  console.log(req.body);
  const { announcement, startDate, endDate } = req.body;
  try {
    if (!announcement) {
      return res.status(400).json({ success: false, message: "Please fill the announcement field" });
    }
    const newAnnouncement = await Announcement.create({ announcement, startDate, endDate });
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

export const updateAnnouncement = async (req, res, next) => {
  const { id } = req.params;
  const { announcement, startDate, endDate } = req.body;
  try {
    const updated = await Announcement.findByIdAndUpdate(
      id,
      { announcement, startDate, endDate },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({
      success: true,
      message: "Announcement Updated!",
      announcement: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({
      success: true,
      message: "Announcement Deleted",
      announcement: deleted,
    });
  } catch (err) {
    next(err);
  }
};
