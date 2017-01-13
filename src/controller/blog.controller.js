const Blog = require('../model/blog.js');
const _ = require('lodash');
const ItemNotFound = require('../errors/itemNotFound.js');
const createDbCommunicationError = require('../util/createDbCommunicationError.js');

const BlogController = (Blog) => {
    return {
        save: (req, res, next) => {
            new Blog(req.body).save((err, data) => {
                createDbCommunicationError(err, next);
                res.status(201).json(data);
            });
        },

        getAll: (req, res, next) => {
            Blog.find((err, data) => {
                createDbCommunicationError(err, next);
//                res.status(200).send(data);
                res.render('index', {
                    title: '若鱼日记',
                    content: data
                });
            });
        },

        getBlogById: (req, res, next) => {
            const blogId = req.params.id;

            Blog.findById(blogId, (err, data) => {
                if(_.isEmpty(data)) {
                    return next(new ItemNotFound(`Blog ${blogId} is not found!`));
                }
                createDbCommunicationError(err, next);
                res.status(200).json(data);
            });
        },

        deleteBlogById: (req, res, next) => {
            Blog.findByIdAndRemove(req.params.id, (err) => {
                createDbCommunicationError(err, next);
                res.status(200).send(`Delete blog successfully`);
            });
        },
    }
};

module.exports = BlogController;