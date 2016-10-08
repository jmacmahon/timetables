/* eslint-env browser */

const React = require('react');
const ReactDOM = require('react-dom');

class Header extends React.Component {
  render() {
    return <h1>Test?</h1>;
  }
}

ReactDOM.render(<Header />, document.getElementById('example'));
