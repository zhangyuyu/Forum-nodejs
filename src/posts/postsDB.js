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
})
const Blog = mongoose.model('Blog', blogSchema);

const postsDB = {
  save(data) {
    const blog = new Blog(data);
    return blog.save();
  }
};

module.exports = postsDB;
