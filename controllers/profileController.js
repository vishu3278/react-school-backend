import { TeacherProfile } from "../models/teacherProfileSchema.js";

export const getProfile = async (req, res, next) => {
  const { email } = req.query;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    let profile = await TeacherProfile.findOne({ email });

    if (!profile) {
      profile = await TeacherProfile.create({
        email,
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (err) {
    next(err);
  }
};

export const upsertProfile = async (req, res, next) => {
  const { email, name, phone, address, qualification, profilePic } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const update = { name, phone, address, qualification, profilePic, email };

    Object.keys(update).forEach((key) => {
      if (update[key] === undefined) {
        delete update[key];
      }
    });

    const profile = await TeacherProfile.findOneAndUpdate(
      { email },
      update,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile saved",
      profile,
    });
  } catch (err) {
    next(err);
  }
};

