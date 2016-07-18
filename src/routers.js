const router = require('express').Router();
const postsRouter = require('./posts/router.js');

router.get('/', (req, res) => {
  res.send('Hello, Forum API !!');
});

router.all('*', (req, res, next) => {
  const contentType = req.get('Content-Type');
  if(contentType && contentType.includes('application/json'))
    {
      next();
    }
  else{
    res.status(400).send('Wrong Content-Type, should be Content-Type:application/json');
  }
});

router.use('/posts', postsRouter);

module.exports = router;
