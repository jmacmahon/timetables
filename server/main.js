const express = require('express');
const compression = require('compression');
const root = require('./root');
const api = require('./api');
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
const fs = require('fs');

const app = express();

const logStream = fs.createWriteStream('./access.log', { flags: 'a' });
const logger = morgan('combined', {
  stream: logStream,
});

app.set('trust proxy', true);

app.use(compression());
app.use(logger);
app.use('/api', api.router);
app.use('/', root.router);
app.set('db', MongoClient.connect('mongodb://localhost:27017/modules'));

app.listen(3000);
