const Router = require('express').Router;
const _ = require('lodash');
const getLocation = require('./locations');

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
  const now = new Date(Date.now());
  req.app.get('db')
  .then(db =>
    db.collection('timetables')
    .find({ $and: [{ 'start-timestamp': { $lte: now } }, { 'end-timestamp': { $gte: now } }] })
    .toArray()
  )
  .then((data) => {
    const pointsP = _.map(data, ev => (
      getLocation(ev.location)
      .then((location) => {
        if (location === null) {
          return null;
        }
        const coords = { coords: [location.lat, location.lon] };
        return coords;
      })
    ));
    Promise.all(pointsP).then((points) => {
      const nonNullPoints = _.filter(points, p => (p !== null));
      res.send(JSON.stringify({
        points: nonNullPoints,
      }));
    });
  });
});

module.exports = {
  router,
};
