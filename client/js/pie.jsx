/* eslint-env browser */

import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';
import crunching from './crunching';

class Pie extends React.Component {
  render() {
    const crunched = crunching.pie(this.props.data.points);
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

Pie.propTypes = {
  data: React.PropTypes.shape({
    points: React.PropTypes.array,
  }),
};

module.exports = Pie;
