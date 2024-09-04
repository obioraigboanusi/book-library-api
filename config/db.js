const mongoose = require('mongoose');

const db = process.env.MONGO_DB_URI; // Database connection string.

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Database connection established');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
