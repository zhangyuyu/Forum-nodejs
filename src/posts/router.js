const router = require('express').Router();
const postsDB = require('./postsDB.js');

router.get('/', (req, res) => {
  res.status(200)
     .send('This is the posts page in Forum!');
});

router.get('/init', (req, res) => {
	postsDB.init().then((data) => {
		console.log('succeed');
		console.log(data);
		res.status(200).json(data);
	}, (err) => {
		res.status(500).json(err);
	});
});

module.exports = router;
