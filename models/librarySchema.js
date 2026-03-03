import mongoose from "mongoose";
import validator from "validator";

const librarySchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    unique: true
  },
  className: {
    type: String,
    required: false,
    default: "",
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  }
});


export const  Book = mongoose.model('Library', librarySchema);



