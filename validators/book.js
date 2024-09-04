const yup = require('yup');

const bookValidator = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    publishedDate: yup
        .date()
        .required('Published date is required')
        .typeError('Published date must be a valid date'),
    genre: yup.string().required('Genre is required'),
});

module.exports = bookValidator;
