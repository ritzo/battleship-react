import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      onClick: props.onClick,
    };
  }

  render() {
    const { value, onClick } = this.state;
    const className = `square ${value}`;

    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
      />
    );
  }
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Square;
