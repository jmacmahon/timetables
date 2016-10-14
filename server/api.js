const Router = require('express').Router;
const _ = require('lodash');
const getLocation = require('./locations');

const router = new Router();

function matchQery() {
  const now = new Date(Date.now() + (60 * 60 * 1000));
  // const now = new Date('2016-10-14T12:30:00.000Z');
  return {
    $match: {
      $and: [
        { 'start-timestamp': { $lte: now } },
        { 'end-timestamp': { $gte: now } },
      ],
    },
  };
}

const lookupQuery = {
  $lookup: {
    from: 'rooms',
    foreignField: 'code',
    localField: 'room',
    as: 'room_docs',
  },
};

router.use('/', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

router.get('/now', (req, res) => {
  const matchQ = matchQery();
  req.app.get('db')
  .then(db =>
    db.collection('timetables')
    .aggregate([matchQ, lookupQuery])
    .toArray()
  )
  .then((data) => {
    const pointsP = _.map(data, ev => (
      getLocation(ev.location)
      .then((location) => {
        if (location === null) {
          return null;
        }
        ev.coords = [location.lat, location.lon];
        return ev;
      })
      .then(() => {
        if (ev.room_docs.length !== 0) {
          ev.capacity = ev.room_docs[0].capacity;
        } else {
          ev.capacity = 15;
        }
        ev.weight = ev.capacity / 100;
        return ev;
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
