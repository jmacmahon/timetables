/* eslint-env browser */

import React from 'react';
import Plottable from 'plottable';

class Pie extends React.Component {
  componentDidMount() {
    const scale = new Plottable.Scales.Linear();
    const colorScale = new Plottable.Scales.InterpolatedColor();
    colorScale.range(['#BDCEF0', '#5279C7']);
    const data = [{ val: 1 }, { val: 2 }, { val: 3 },
      { val: 4 }, { val: 5 }, { val: 6 }];

    const plot = new Plottable.Plots.Pie()
      .addDataset(new Plottable.Dataset(data))
      .sectorValue(d => d.val, scale)
      .attr('fill', d => d.val, colorScale)
      .renderTo('svg#pie');


    window.addEventListener('resize', () => { plot.redraw(); });
  }

  render() {
    return <svg id="pie" />;
  }
}

module.exports = Pie;
