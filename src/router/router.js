const router = require('express').Router();
const Blog = require('../model/blog.js');
const BlogController = require('../controller/blog.controller.js')(Blog);

router.get('/forum-api/blogs', BlogController.getAll);

router.get('/forum-api/blogs/:id', BlogController.getBlogById);

router.post('/forum-api/blogs', BlogController.save);

router.delete('/forum-api/blogs/:id', BlogController.deleteBlogById);

router.get('/forum-api', (req, res) => {
    res.send('Hello, Forum API !');
});

module.exports = router;
