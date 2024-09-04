const Book = require('../models/book');
const bookValidator = require('../validators/book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createBook = async (req, res) => {
    try {
        const validatedData = await bookValidator.validate(req.body, {
            abortEarly: false,
        });
        const newBook = new Book(validatedData);

        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message, details: err.errors });
    }
};

exports.getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).send('Failed to get book');
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(book);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).send('Failed to update book');
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book removed successfully' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).send('Failed to delete book');
    }
};
