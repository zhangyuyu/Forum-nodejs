const router = require('express').Router();
const postsRouter = require('./posts/router.js');

router.get('/', (req, res) => {
  res.send('Hello, Forum API !!');
});

router.use('/posts', postsRouter);

module.exports = router;
