const mongoose = require('mongoose');

const db = process.env.MONGO_DB_URI; // Database connection string.

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Database connection established');
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        process.exit(1);
    }
};

module.exports = connectDB;
