import _ from 'lodash';

function getWeight(groupedEvents) {
  let capacity;
  if (groupedEvents[0].room_docs.length !== 0) {
    capacity = groupedEvents[0].room_docs[0].capacity;
  } else {
    capacity = 15;
  }
  return capacity / 150.0;
}

function heatmap(points) {
  return _.chain(points)
  .groupBy('room').values()
  .map(v => ([
    v[0].coords[0],
    v[0].coords[1],
    getWeight(v),
  ]))
  .value();
}

function pieYears(points) {
  const out = _.chain(points)
  .groupBy(point => point.code[3])
  .mapValues(v => v.length)
  .defaults({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 })
  .value();
  return _.values(out);
}

function pieBuildings(points) {
  const out = _.chain(points)
  .groupBy('location')
  .mapValues(v => v.length)
  .toPairs()
  .map(p => ({ label: p[0], count: p[1] }))
  .sortBy('count')
  .reverse()
  .value();
  return {
    labels: _.map(out, p => p.label),
    counts: _.map(out, p => p.count),
  };
}

module.exports = {
  heatmap,
  pieYears,
  pieBuildings,
};
