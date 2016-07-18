const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/postsDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to mongodb');
});

const Schema = mongoose.Schema;
const blogSchema = new Schema({
      title: String, 
      author: String, 
      body: String,
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
});


const Blog = mongoose.model('Blog', blogSchema);
const initBlog = new Blog({
      title: 'First Blog',
      author: 'Test',
      body: 'A book is a gift you can open again and again!',
      comments: [
        {
           body: 'This is a  comment.',
	   date: Date.now()
	}
      ],
      hidden: false,
      meta: {
	votes: 1,
        favs: 1
      }
});

console.log(`${initBlog.title} -> ${initBlog.author} -> ${initBlog.body}`);

const postsDB = {
  init() {
    return initBlog.save();    }
};

module.exports = postsDB;
