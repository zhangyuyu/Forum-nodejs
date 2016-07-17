const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello, Forum API !!');
});

module.exports = router;
