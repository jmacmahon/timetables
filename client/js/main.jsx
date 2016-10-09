/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import request from 'superagent';
import map from 'lodash/map';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.markers = [];
  }

  componentDidMount() {
    this.map = L.map('map').setView([53.381089, -1.4834976], 16);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.pollForPoints(this);
    setInterval(this.pollForPoints.bind(this), this.props.pollInterval);
  }

  componentDidUpdate() {
    map(this.markers, marker => this.map.removeLayer(marker));
    this.markers = map(this.state.points, point => L.marker(point.coords).addTo(this.map));
  }

  pollForPoints() {
    request
      .get('/api/test')
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

ReactDOM.render(<Map />, document.getElementById('root'));
