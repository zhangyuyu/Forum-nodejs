const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogDb');
const blogDb = mongoose.connection;

blogDb.on('error', (err) => {
	console.log(`[Error] [${err.name}]: ${err.message}`);
});
blogDb.once('open', () => {
	console.log('Connected to mongodb...');
});

module.exports = blogDb;
