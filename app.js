const express = require('express');
const ejs = require('ejs');
const router = require('./src/router/router.js');
const bodyParser = require('body-parser');
const handlerError = require('./src/handler/handler.js');
require('./src/dao/blogDb.js');

ejs.filters.fromNow = function(date){
    moment.lang('zh-cn');
    return moment(date).fromNow();
}

const app = express();

// view engine setup
app.engine('.ejs', ejs.__express);
app.set('views', 'src/views/');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use('/', router);

handlerError(app);

app.listen(3000, () => {
    console.log('Forum app listening on port 3000!');
});

module.exports = app;
