/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import request from 'superagent';

import Map from './map.jsx';
import Pie from './pie.jsx';
import { Widget } from './ui.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { points: [] } };
  }

  componentDidMount() {
    this.pollForPoints();
    setInterval(this.pollForPoints.bind(this), 5000);
  }

  pollForPoints() {
    const data = request.get('/api/now').set('Accept', 'application/json');
    data.then((res) => {
      this.setState({ data: { points: res.body.points } });
    });
  }

  render() {
    return (<Container fluid>
      <Row>
        <Col sm="6">
          <Widget double title="Heat Map" description="Weighted by room capacity">
            <Map data={this.state.data} />
          </Widget>
        </Col>
        <Col sm="6">
          <Widget
            double
            title="Lectures by Year"
            description="Unweighted.  Some duplicates e.g. COM6222 = COM3002."
          >
            <Pie data={this.state.data} />
          </Widget>
        </Col>
      </Row>
    </Container>);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
