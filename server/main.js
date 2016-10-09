const express = require('express');
const root = require('./root');
const api = require('./api');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use('/api', api.router);
app.use('/', root.router);
app.set('db', MongoClient.connect('mongodb://localhost:27017/modules'));

app.listen(3000);
