const express = require('express');
const routers = require('./src/routers.js');
const bodyParser = require('body-parser');

const app = express();

app.use('/forum-api', bodyParser.json());
app.use('/forum-api', routers);

app.get('*', (req, res) => {
  res.status(404)
     .send('NOT FOUND!');
});

app.listen(3000, () => {
  console.log('Forum app listening on port 3000!');
});

module.exports = app;
