const request = require('supertest');
const should = require('should');
const app = require('../../app.js');

describe('Posts : ', () => {

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

  it('should get all post successfully', function(done) {
  	request(app)
	  .get('/forum-api/posts')
	  .expect('Content-Type', /json/)
	  .expect(200)
	  .expect((response) => {
	     response.body.should.be.instanceof(Array);
	  })
	  .end(done);
  });

  it('should create a blog and get one blog by id', function(done) {
  	request(app)
	  .post('/forum-api/posts')
	  .send(blog)
	  .expect('Content-Type', /json/)
	  .expect(201)
	  .end((error, response) => {
	      if (error) {
		  throw error;
	      }
	      response.body.should.have.property('_id');
	      response.body.title.should.be.exactly(blog.title);

	      request(app)
		  .get('/forum-api/posts/' + response.body._id)
		  .expect('Content-Type', /json/)
		  .expect(200)
		  .end(done);
	  });
  });

  it('should create a blog and delete one blog by id', function(done) {
  	request(app)
	  .post('/forum-api/posts')
	  .send(blog)
	  .expect('Content-Type', /json/)
	  .expect(201)
	  .end((error, response) => {
	     if (error) {
	     	throw error;
	     }

	     request(app)
		  .delete('/forum-api/posts/' + response.body._id)
		  .expect(200)
		  .end(done);
	  });
  });
});
