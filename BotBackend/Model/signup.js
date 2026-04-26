 const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Database connection function
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_API_KEY);
        console.log("mongodb Connected....");
    } catch (error) {
        console.log("Error Connection Mongodb:", error.message);
    }
};

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = { connectDb, User };