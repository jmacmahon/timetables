/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import heat from 'leaflet.heat';
import request from 'superagent';
import map from 'lodash/map';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.markers = [];
  }

  componentDidMount() {
    this.map = L.map('map').setView([53.381089, -1.4834976], 15);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.heatLayer = L.heatLayer([], { radius: 25 });
    this.heatLayer.addTo(this.map);
    this.pollForPoints(this);
    setInterval(this.pollForPoints.bind(this), this.props.pollInterval);
  }

  componentDidUpdate() {
    this.heatLayer.setLatLngs(map(this.state.points, point => (
      [point.coords[0], point.coords[1], point.weight]
    )));
    this.heatLayer.redraw();
  }

  pollForPoints() {
    request
      .get('/api/now')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err) {
          this.setState({ points: res.body.points });
        }
      });
  }

  render() {
    return <div id="map" />;
  }
}

Map.defaultProps = {
  pollInterval: 5000,
};
Map.propTypes = {
  pollInterval: React.PropTypes.number,
};

ReactDOM.render(<Map pollInterval={500} />, document.getElementById('root'));
