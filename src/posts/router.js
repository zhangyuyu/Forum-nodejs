const router = require('express').Router();
const postsDB = require('./postsDB.js');

router.get('/', (req, res) => {
  res.status(200)
     .send('This is the posts page in Forum!');
});

router.post('/', (req, res) => {
	postsDB.save(req.body).then((data) => {
		console.log('Save post succeessfully');
		res.status(200).json(data);
	}, (err) => {
		res.status(500).json(err);
	});
});

module.exports = router;
