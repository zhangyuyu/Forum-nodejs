const router = require('express').Router();
const postsDB = require('./postsDB.js');

router.get('/', (req, res) => {
	postsDB.getAll().then((data) => {
		res.status(200).send(data);
	}, (err) => {
		res.status(500).send(err);
	});
});

router.post('/', (req, res) => {
	postsDB.save(req.body).then((data) => {
		console.log('Save post succeessfully');
		res.status(201).json(data);
	}, (err) => {
		res.status(500).json(err);
	});
});

module.exports = router;
