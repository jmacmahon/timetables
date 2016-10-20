import React from 'react';

function Widget(props) {
  let heightClass;
  if (props.double === true) {
    heightClass = 'widget-double';
  } else {
    heightClass = 'widget-single';
  }
  const className = `widget ${heightClass}`;
  return (<div className={className}>
    <div className="widget-title">{props.title}</div>
    <div className="widget-fill">{props.children}</div>
    <div className="widget-description">{props.description}</div>
  </div>);
}

Widget.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  children: React.PropTypes.node,
  double: React.PropTypes.bool,
};

Widget.propDefaults = {
  double: false,
};

module.exports = {
  Widget,
};
