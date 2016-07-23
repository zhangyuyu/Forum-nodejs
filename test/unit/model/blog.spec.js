const Blog = require('../../../src/model/blog.js');
const should = require('should');

const blog = new Blog({
    "title": "Test Blog",
    "author": "Zhang Yu",
    "body": "A truth needs no colour; beauty, no pencil!",
    "hidden": false,
    "meta": {
        "votes": 2,
        "favs": 1
    },
    "category": "Life",
    "comments":
    [
        {
        "body": "Some fish could not be kept in cptivity. Because they belong to the sky",
        "date": "2016-07-18T17:10:47.149Z"
        }
    ]
});

describe('Blog unit test : ', () => {
    it('Should validate title', () => {
        blog.title = null;
        const error = blog.validateSync();
        should.equal(error.errors['title'].message, 'Title is required');
    });

    it('Should validate category', () => {
        blog.category = "Study";
        const error = blog.validateSync();
        should.equal(error.errors['category'].message,'`Study` is not a valid enum value for path `category`.');
    });
});