const express = require('express');
const router = require('./src/router/router.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router(app);

app.listen(3000, () => {
    console.log('Forum app listening on port 3000!');
});

mongoose.connect('mongodb://localhost/postsDB');
const db = mongoose.connection;

db.on('error', (err) => {
	console.log(`[Error] [${err.name}]: ${err.message}`);
});
db.once('open', () => {
	console.log('Connected to mongodb...');
});

module.exports = app;
