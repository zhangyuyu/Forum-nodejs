const express = require('express');
const routers = require('./src/routers.js');

const app = express();

app.use('/forum-api', routers);

app.listen(3000, () => {
  console.log('Forum app listening on port 3000!');
});
