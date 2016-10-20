/* eslint-env browser */

import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';

class Pie extends React.Component {
  render() {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow',
      ],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
        },
      ],
    };
    const options = {
      animation: {
        duration: 0,
      },
    };
    return <PieChart data={data} options={options} />;
  }
}

module.exports = Pie;
