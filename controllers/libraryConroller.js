import { Book } from "../models/librarySchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createBook = async (req, res, next) => {
  console.log(req.body);
  const { bookname, author, className, price } = req.body;
  try {
    if (!bookname || !author ) {
      return next("Please Fill Full Form!", 400);
    }
    await Book.create({ bookname, author, className, price });
    res.status(200).json({
      success: true,
      message: "A new book is Created!",
    });    
  } catch (err) {
    next(err);
  } 
};

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      books,
    });   
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  const { id, bookname, author, className, price } = req.body;
  try {
    if (!id) {
      return next("Book id is required", 400);
    }

    const update = { bookname, author, className, price };
    Object.keys(update).forEach((key) => {
      if (update[key] === undefined) {
        delete update[key];
      }
    });

    const updated = await Book.findByIdAndUpdate(id, update, { new: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated",
      book: updated,
    });
  } catch (err) {
    next(err);
  }
};
