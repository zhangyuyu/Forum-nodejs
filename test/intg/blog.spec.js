const request = require('supertest');
const should = require('should');
const app = require('../../app.js');

describe('Blogs integration test : ', () => {

    const blog = {
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
        let id;
        before((done) => {
            request(app)
                .post('/forum-api/blogs')
                .send(blog)
                .end((err, response) => {
                    id = response.body._id;
                    done();
                    })
        });

        after((done) => {
            request(app)
                .delete('/forum-api/blogs/' + id)
                .end(done);
        });

        it('should get one blog by id', (done) => {
            request(app)
                .get('/forum-api/blogs/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        });

        it('should get all post successfully', (done) => {
            request(app)
                .get('/forum-api/blogs')
                .expect(200)
                .expect((response) => {
                    response.body.should.be.instanceof(Array);
                })
                .end(done);
            });
    });

    describe('Create blog', () => {
        let id;
        after((done) => {
            request(app)
                .delete('/forum-api/blogs/' + id)
                .end(done);
        });

        it('should create a blog', (done) => {
            request(app)
                .post('/forum-api/blogs')
                .send(blog)
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, response) => {
                    id = response.body._id;
                    done();
            });
        });
    });

    describe('Delete blog', () => {
        let id;
        before((done) => {
            request(app)
            .post('/forum-api/blogs')
            .send(blog)
            .end((err, response) => {
                id = response.body._id;
                done();
                });
            });

        it('should delete one blog by id', (done) => {
            request(app)
                .delete('/forum-api/blogs/' + id)
                .expect(200)
                .end(done);
            });
    });
})
