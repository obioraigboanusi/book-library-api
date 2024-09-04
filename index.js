require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const booksRouter = require('./routes/books');

const app = express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.use('/api/v1/books', booksRouter);
app.get('/', (_, res) => res.send('Book Library App'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
