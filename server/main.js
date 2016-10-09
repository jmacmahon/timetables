const express = require('express');

const app = express();

function randomPoint() {
  const latOffset = (Math.random() - 0.5) * 0.01;
  const longOffset = (Math.random() - 0.5) * 0.005;
  return [53.381089 + latOffset, -1.4834976 + longOffset];
}

app.use('/bundled', express.static('client/bundled'));
app.get('/api/test', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({
    points: [
      { coords: randomPoint() },
      { coords: randomPoint() },
      { coords: randomPoint() },
      { coords: randomPoint() },
    ],
  }));
});
app.use('/', express.static('client/static'));

app.listen(3000, () => {});
