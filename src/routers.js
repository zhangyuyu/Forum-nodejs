const router = require('express').Router();
const postsRouter = require('./posts/router.js');
const _ = require('lodash');

router.get('/', (req, res) => {
  res.send('Hello, Forum API !!');
});

router.all('*', (req, res, next) => {
  const method = req.method;
  const contentType = req.get('Content-Type');

  if(_.includes(['GET', 'DELETE'], method)) next();
  else {
    if(contentType && _.includes('application/json', contentType)){
      next();
    } else {
      res.status(400).send('Wrong Content-Type, should be Content-Type:application/json');
    }
  }
});

router.use('/posts', postsRouter);

module.exports = router;
