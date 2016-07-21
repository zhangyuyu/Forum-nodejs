const Blog = require('../model/blog.js');
const _ = require('lodash');
const ItemNotFound = require('../errors/itemNotFound.js');
const DbCommunicationError = require('../errors/dbCommunicationError.js');

const BlogController = (Blog) => {

    return {
        save: (req, res, next) => {
            new Blog(req.body).save().then((data) => {
                res.status(201).json(data);
            }, (err) => {
                return next(new DbCommunicationError(`Communication error when create blog: ${err.message}`));
            });
        },

        getAll: (req, res, next) => {
            Blog.find().then((data) => {
                res.status(200).send(data);
            }, (err) => {
                return next(new DbCommunicationError(`Communication error when retrieve all blogs: ${err.message}`));
            });
        },

        getBlogById: (req, res, next) => {
            const blogId = req.params.id;

            Blog.findById(blogId).then((data) => {
                if(_.isEmpty(data)) {
                    return next(new ItemNotFound(`Cannot find blog with ${blogId}`));
                }
                res.status(200).json(data);
            }, (err) => {
                return next(new DbCommunicationError(`Communication error when retrieve blog: ${err.message}`));
            });
        },

        deleteBlogById: (req, res, next) => {
            Blog.findByIdAndRemove(req.params.id).then(() => {
                res.status(200).send(`Delete blog successfully`);
            }, (err) => {
                return next(new DbCommunicationError(`Comminication error when delete blog: ${err.message}`));
            });
        },
    }
};

module.exports = BlogController;