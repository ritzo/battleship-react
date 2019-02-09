import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.value,
      onClick: props.onClick,
    };
  }

  render() {
    const { title, onClick } = this.state;

    return (
      <button
        type="button"
        className="square"
        onClick={onClick}
      >
        { title }
      </button>
    );
  }
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Square;
