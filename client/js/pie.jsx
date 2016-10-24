/* eslint-env browser */

import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';
import tinycolor from 'tinycolor2';
import _ from 'lodash';
import crunching from './crunching';

class PieYears extends React.Component {
  render() {
    const crunched = crunching.pieYears(this.props.data.points);
    const data = {
      labels: [
        'Year 0 (Foundation)',
        'Year 1 (UG)',
        'Year 2 (UG)',
        'Year 3 (UG)',
        'Year 4 (UG)',
        'Year 5 (UG)',
        'Year 6 (PGT)',
      ],
      datasets: [
        {
          data: crunched,
          backgroundColor: [
            '#FFCE56',
            '#8ACAF4',
            '#5DB6EF',
            '#36A4EB',
            '#0E90E4',
            '#0579C5',
            '#FF6384',
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#8ACAF4',
            '#5DB6EF',
            '#36A4EB',
            '#0E90E4',
            '#0579C5',
            '#FF6384',
          ],
          borderWidth: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
    const options = {
      animation: {
        duration: 0,
      },
      legend: {
        labels: {
          fontColor: '#DDDDDD',
        },
      },
    };
    return <PieChart data={data} options={options} />;
  }
}

PieYears.propTypes = {
  data: React.PropTypes.shape({
    points: React.PropTypes.array,
  }),
};

class PieBuildings extends React.Component {
  render() {
    const crunched = crunching.pieBuildings(this.props.data.points);
    const n = crunched.labels.length;
    const total = _.sum(crunched.counts);
    const colors = [];
    const borders = [];
    let color = tinycolor('#0579C5');
    for (let i = 0; i < n; i += 1) {
      colors.push(color);
      color = color.clone().spin(360.0 * (crunched.counts[i] / (total + 0.0)));
      borders.push(0);
    }
    const data = {
      labels: crunched.labels,
      datasets: [
        {
          data: crunched.counts,
          backgroundColor: _.map(colors, c => c.toHexString()),
          hoverBackgroundColor: _.map(colors, c => c.lighten(5).toHexString()),
          borderWidth: borders,
        },
      ],
    };
    const options = {
      animation: {
        duration: 0,
      },
      legend: {
        display: false,
      },
    };
    return <PieChart data={data} options={options} />;
  }
}

PieBuildings.propTypes = {
  data: React.PropTypes.shape({
    points: React.PropTypes.array,
  }),
};

module.exports = {
  PieYears,
  PieBuildings,
};
