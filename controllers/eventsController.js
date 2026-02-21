import { Events } from "../models/eventsSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createEvents = async (req, res, next) => {
  const { events, date } = req.body;
  try {
    if (!events || !date) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }
    const newEvent = await Events.create({ events, date });
    res.status(200).json({
      success: true,
      message: "Event is Created!",
      event: newEvent,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Events.find();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    next(err);
  }
};

