const router = require('express').Router();
const postsRouter = require('./posts/router.js');
const _ = require('lodash');
const ContentTypeError = require('./errors/contentTypeError.js');

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
      return next(new ContentTypeError(`Expected "application/json" Content-type, but got "${contentType}"`));
    }
  }
});

router.use('/posts', postsRouter);

router.use((err, req, res, next) => {
  const type = err.type;
  const message = err.message;

  if(type === 'ItemNotFound') {
     return res.status(404).send(message);
  }
  if(type === 'ContentTypeError') {
    return res.status(400).send(message);
  }
  if(type === 'DbCommunicationError') {
    return res.status(500).send(message);
  }
  return res.status(500).send(message);
});

module.exports = router;
