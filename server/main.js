const express = require('express');

const app = express();

app.use('/bundled', express.static('client/bundled'));
app.use('/', express.static('client/static'));

app.listen(3000, () => {});
