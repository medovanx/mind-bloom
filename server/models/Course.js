const { Schema, model } = require('mongoose');

// Define the schema for the Course model
const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
    },
    level: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4],
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

// Create the Course model using the schema
const Course = model('Course', courseSchema);

module.exports = Course;