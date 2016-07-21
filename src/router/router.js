const Blog = require('../model/blog.js');
const BlogController = require('../controller/blog.controller.js')(Blog);

const router = (app) => {
    app.get('/forum-api/blogs', BlogController.getAll);

    app.get('/forum-api/blogs/:id', BlogController.getBlogById);

    app.post('/forum-api/blogs', BlogController.save);

    app.delete('/forum-api/blogs/:id', BlogController.deleteBlogById);

    app.get('/forum-api', (req, res) => {
        res.send('Hello, Forum API !');
    });
}

module.exports = router;
