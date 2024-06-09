const { Schema, model } = require('mongoose');

// Define the schema for the User model
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/',
    },
    coverImage: {
        type: String,
        default: 'https://via.placeholder.com/1500x500',
    },
    roles: {
        type: [String],
        default: ['Student'],
        enum: ['Student', 'Teacher', 'Admin'],
    },
    certificates: [{
        title: String,
        date: Date,
    }],
});

// Create the User model using the schema
const User = model('User', userSchema);

module.exports = User;
