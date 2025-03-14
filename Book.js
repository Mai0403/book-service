const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true, unique: true } // Add the ISBN field
});

module.exports = mongoose.model("Book", BookSchema);
