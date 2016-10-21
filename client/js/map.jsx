/* eslint-env browser */

import React from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import crunching from './crunching';

class Map extends React.Component {
  componentDidMount() {
    this.map = L.map('map').setView([53.381089, -1.4834976], 15);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.heatLayer = L.heatLayer([], { radius: 25 });
    this.heatLayer.addTo(this.map);
  }

  componentDidUpdate() {
    const crunched = crunching.heatmap(this.props.data.points);
    this.heatLayer.setLatLngs(crunched);
    this.heatLayer.redraw();
  }

  render() {
    return <div id="map" />;
    // TODO unique IDs;
  }
}

Map.propTypes = {
  data: React.PropTypes.shape({
    points: React.PropTypes.array,
  }),
};

module.exports = Map;
