const request = require('supertest');
const app = require('../../app.js');

describe('Posts : ', () => {
  it('should get all post successfully', function(done) {
  	request(app)
	  .get('/forum-api/posts')
	  .expect('Content-Type', /json/)
	  .expect(200)
	  .end(done);
  });
});
