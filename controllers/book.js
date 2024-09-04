const Book = require('../models/book');
const bookValidator = require('../validators/book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error(err.message);
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
        console.log({ err });
        res.status(400).json({ error: err.message });
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
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).send('Server Error');
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
            //     { new: true }
        );

        res.status(200).json(book);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).send('Server Error');
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Not found' });
        }

        await book.remove();
        res.status(200).json({ message: 'Book removed successfully' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).send('Server Error');
    }
};
