const booksRouter = require('express').Router();

booksRouter.get('/', () => {
    console.log('Get all books');
});

booksRouter.post('/', () => {
    console.log('Created book');
});

booksRouter.get('/:id', () => {
    console.log('Get a book');
});

booksRouter.patch('/:id', () => {
    console.log('Update a book');
});

booksRouter.delete('/:id', () => {
    console.log('Delete a book');
});

module.exports = booksRouter;
