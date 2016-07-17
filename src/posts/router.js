const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200)
     .send('This is the posts page in Forum!');
});

module.exports = router;
