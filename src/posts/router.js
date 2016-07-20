const router = require('express').Router();
const postsDB = require('./postsDB.js');
const _ = require('lodash');
const ItemNotFound = require('../errors/itemNotFound.js');
const DbCommunicationError = require('../errors/dbCommunicationError.js');

router.get('/', (req, res, next) => {
	postsDB.getAll().then((data) => {
		res.status(200).send(data);
	}, (err) => {
		return next(new DbCommunicationError('Comminication error when retrieve all posts.'));
	});
});

router.get('/:id', (req, res, next) => {
	const postId = req.params.id;

	postsDB.getPostById(postId).then((data) => {
		if(_.isEmpty(data)) {
			return next(new ItemNotFound(`Cannot find post with ${postId}`));
		}
		res.status(200).json(data);
	}, (err) => {
		return next(new DbCommunicationError('Comminication error when retrieve post.'));
	});
});

router.post('/', (req, res, next) => {
	postsDB.save(req.body).then((data) => {
		res.status(201).json(data);
	}, (err) => {
		return next(new DbCommunicationError('Comminication error when create post.'));
	});
});

router.delete('/:id', (req, res, next) => {
	postsDB.deletePostById(req.params.id).then((data) => {
		res.status(200).send();
	}, (err) => {
		return next(new DbCommunicationError('Comminication error when delete post.'));
	});
});

module.exports = router;
