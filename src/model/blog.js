const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: String,
    body: String,
    category: {
        type: String,
        enum: ['Life', 'Knowledge', 'Other']
    },
    comments: [
        {
           body: String,
           date: Date
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
