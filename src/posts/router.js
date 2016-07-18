const router = require('express').Router();
const postsDB = require('./postsDB.js');
const _ = require('lodash');

router.get('/', (req, res) => {
	postsDB.getAll().then((data) => {
		res.status(200).send(data);
	}, (err) => {
		res.status(500).send(err);
	});
});

router.get('/:id', (req,res) => {
	postsDB.getPostById(req.params.id).then((data) => {
		if(_.isEmpty(data)){
			res.status(404).send('This post is not found!');
		} else {
			res.status(200).json(data);
		}
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

router.delete('/:id', (req, res) => {
	postsDB.deletePostById(req.params.id).then((data) => {
		res.status(200).send();
	}, (err) => {
		res.status(500).send(err);
	});
});

module.exports = router;
