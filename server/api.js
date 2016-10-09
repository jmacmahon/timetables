const Router = require('express').Router;

const router = new Router();

function randomPoint() {
  const latOffset = (Math.random() - 0.5) * 0.002;
  const longOffset = (Math.random() - 0.5) * 0.01;
  return [53.381089 + latOffset, -1.4834976 + longOffset];
}

router.use('/', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

router.get('/test', (req, res) => {
  res.send(JSON.stringify({
    points: [
      { coords: randomPoint() },
      { coords: randomPoint() },
      { coords: randomPoint() },
      { coords: randomPoint() },
    ],
  }));
});

router.get('/test2', (req, res) => {
  req.app.get('db')
  .then(db =>
    db.collection('timetables')
    .find()
    .limit(20)
    .toArray()
  )
  .then((data) => {
    res.send(JSON.stringify(data));
  });
});

module.exports = {
  router,
};
