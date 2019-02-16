import React from 'react';
import PropTypes from 'prop-types';
import { ORIENTATION } from '../../constants/Constants';

import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
    };
  }

  render() {
    const { x, y } = this.state;
    const { matrix } = this.props;
    const value = matrix[y][x];
    const className = `square ${value}`;

    this.onClickHandler = (event, index) => {
      const { actions } = this.props;

      let orientation = ORIENTATION.HORIZONTAL;
      if (event.type === 'contextmenu') {
        orientation = ORIENTATION.VERTICAL;
      }

      const clickParam = Object.assign({}, index, { orientation });

      if (actions.onClickHandler) {
        actions.onClickHandler(clickParam);
      }
      // Prevents the right button defaults action.
      event.preventDefault();
    };

    return (
      <button
        type="button"
        className={className}
        onClick={e => this.onClickHandler(e, { x, y })}
        onContextMenu={e => this.onClickHandler(e, { x, y })}
      />
    );
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired).isRequired,
  actions: PropTypes.shape({
    onClickHandler: PropTypes.func,
  }).isRequired,
};

export default Square;
