const express = require("express");
const Book = require("./Book");
// const { authMiddleware, adminMiddleware } = require("./authMiddleware");

const router = express.Router();

// Get all books
router.get("/user", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Get book by ID
router.get("/user/:bookID", async (req, res) => {
    const book = await Book.findOne({ bookID: req.params.bookID });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

// Get book by title
router.get("/user/title/:title", async (req, res) => {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

// Add a new book (Admin only)
// router.post("/add", adminMiddleware, async (req, res) => {
//     try {
//         const book = new Book(req.body);
//         await book.save();
//         res.status(201).json({ message: "Book added", book });
//     } catch (error) {
//         res.status(400).json({ error: "Invalid book data" });
//     }
// });
router.post("/admin/add", async (req, res) => {
    try {
        const { bookID, title, author, genre, isbn } = req.body;

        // Check if any required field is missing
        if (!bookID || !title || !author || !genre || !isbn) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if bookID or ISBN already exists
        const existingBook = await Book.findOne({ $or: [{ bookID }, { isbn }] });
        if (existingBook) {
            return res.status(400).json({ error: "Book with this ID or ISBN already exists" });
        }

        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: "Book added", book });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || "Invalid book data" });
    }
});


// Update book details (Admin only)
router.put("/admin/update/:bookID", async (req, res) => {
    const book = await Book.findOneAndUpdate({ bookID: req.params.bookID }, req.body, { new: true });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book updated", book });
});

// Delete a book (Admin only)
router.delete("/admin/delete/:bookID", async (req, res) => {
    const book = await Book.findOneAndDelete({ bookID: req.params.bookID });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted" });
});

module.exports = router;
