const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/postsDB');
const db = mongoose.connection;

db.on('error', (err) => {
	console.log(`[Error] [${err.name}]: ${err.message}`);
});
db.once('open', () => {
	console.log('Connected to mongodb...');
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
  },
  getAll() {
    return Blog.find({});
  },
  getPostById(id) {
    return Blog.findById(id);
  },
  deletePostById(id) {
    return Blog.findByIdAndRemove(id);
  }
};

module.exports = postsDB;
