import React from 'react';
import PropTypes from 'prop-types';

import './NextShip.css';

function NextShip(props) {
  const { availableShips } = props;
  const [nextShip] = availableShips;

  if (!nextShip) {
    return (
      <div className="next-ship-container">
        <p>The fleet is ready</p>
      </div>
    );
  }

  return (
    <div className="next-ship-container">
      <p className="edition-hint">Left click to add a ship horizontally, right click to add it vertically.</p>
      <p className="edition-hint">On mobile: press to add a ship horizontally, long press to add it vertically.</p>

      <p>
        <span>Next ship: </span>
        { nextShip }
      </p>

      <p>
        <span>Ships left: </span>
        { availableShips.slice(1).join(', ') || '-'}
      </p>
    </div>
  );
}

NextShip.propTypes = {
  availableShips: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default NextShip;
