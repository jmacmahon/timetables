/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
  render() {
    return <h1>Test?</h1>;
  }
}

ReactDOM.render(<Header />, document.getElementById('example'));
