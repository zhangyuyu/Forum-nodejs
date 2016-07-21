"use strict";

const sinon = require('sinon');
const mongoose = require('mongoose');
const should = require('should');
const Blog = require('../../../src/model/blog.js');
require('sinon-mongoose');

describe('Blog Controller unit test : ', () => {

    const content = {
        "title": "Test Blog",
        "author": "Zhang Yu",
        "body": "A truth needs no colour; beauty, no pencil!",
        "hidden": false,
        "meta": {
            "votes": 2,
            "favs": 1
        },
        "comments":
        [
            {
            "body": "Some fish could not be kept in cptivity. Because they belong to the sky",
            "date": "2016-07-18T17:10:47.149Z"
            }
        ]
    };

    describe('Get blog', () => {
        it('Should get a blog by id', (done) => {
            const blogMock = sinon.mock(Blog);
            blogMock.expects('findById').withArgs(12345).yields(null, 'GET');

            Blog.findById(12345, (err, response) => {
                blogMock.verify();
                blogMock.restore();
                should.equal('GET', response, "Test fails due to unexpected response")
                done();
            });
        });

        it('Should get all the blogs', (done) => {
            const blogMock = sinon.mock(Blog);
            blogMock.expects('find').yields(null, 'GET');

            Blog.find((err, response) => {
                blogMock.verify();
                blogMock.restore();
                should.equal('GET', response, "Test fails due to unexpected response")
                done();
            });
        });
    });

	describe('Create blog', () => {
		it('Should create a blog', (done) => {
			const blogMock = sinon.mock(new Blog(content));
			const blog = blogMock.object;

			blogMock.expects('save').yields(null, 'SAVED');

			blog.save((err, response) => {
				blogMock.verify();
				blogMock.restore();
				should.equal('SAVED', response, "Test fails due to unexpected response")
				done();
			});
		});

	});

	describe('Delete blog', () => {
		it('Should delete a blog by id', (done) => {
			var blogMock = sinon.mock(Blog);

			blogMock
			.expects('findByIdAndRemove')
			.withArgs(12345)
			.yields(null, 'DELETED');

			Blog.findByIdAndRemove(12345, (err, response) => {
				blogMock.verify();
				blogMock.restore();
				should.equal('DELETED', response, "Test fails due to unexpected response")
				done();
			})
		});
	});
});
