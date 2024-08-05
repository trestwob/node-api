const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.MONGO_URL

const connectToDb = async () => {
    try {
        await mongoose.connect(url).then(() => {console.log("MongoDB connected")});
    } catch (error) {
        console.error(`Ccannot connect to MongoDB ${error}`);
        process.exit(1);
    }
}

module.exports = connectToDb;
