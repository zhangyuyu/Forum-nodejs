const request = require('supertest');
const should = require('should');
const app = require('../../app.js');

describe('Blog integration test : ', () => {

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

        it('should get a blog by id', (done) => {
            request(app)
                .get('/forum-api/blogs/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        });

        it('should get all the blogs', (done) => {
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

        it('should delete a blog by id', (done) => {
            request(app)
                .delete('/forum-api/blogs/' + id)
                .expect(200)
                .end(done);
            });
    });

    describe('Error handling', ()=>{
        it('should return 404 when getting blog with invalid post id', function(done){
            request(app)
            .get('/forum-api/blogs/123456789')
            .expect(404, done);
        });

        it('should return 400 when creating blog with invalid data', function(done){
            request(app)
                .post('/forum-api/blogs')
                .send({
                    "author":"",
                    "content":"",
                    "category": "Study",
                    "comments":[],
                    "hidden": false,
                    "meta": {}
                })
                .expect(400)
                .end((err, res)=>{
                    should.equal(res.error.text,"Communication with blog db error: ValidationError: Title is required, `Study` is not a valid enum value for path `category`.");
                    done();
                });
        });
    });
})
