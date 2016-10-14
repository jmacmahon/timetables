import _ from 'lodash';

function heatmap(points) {
  function getWeight(groupedEvents) {
    let capacity;
    if (groupedEvents[0].room_docs.length !== 0) {
      capacity = groupedEvents[0].room_docs[0].capacity;
    } else {
      capacity = 15;
    }
    return capacity / 150.0;
  }

  return _.chain(points)
  .groupBy('room').values()
  .map(v => ([
    v[0].coords[0],
    v[0].coords[1],
    getWeight(v),
  ]))
  .value();
}

module.exports = {
  heatmap,
};
