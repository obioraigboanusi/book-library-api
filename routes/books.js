const {
    getAllBooks,
    createBook,
    getSingleBook,
    updateBook,
    deleteBook,
} = require('../controllers/book');

const booksRouter = require('express').Router();

booksRouter.get('/', getAllBooks);

booksRouter.post('/', createBook);

booksRouter.get('/:id', getSingleBook);

booksRouter.patch('/:id', updateBook);

booksRouter.delete('/:id', deleteBook);

module.exports = booksRouter;
