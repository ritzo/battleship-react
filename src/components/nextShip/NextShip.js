import React from 'react';
import PropTypes from 'prop-types';

import './NextShip.css';

function NextShip(props) {
  const { availableShips } = props;
  const [nextShip] = availableShips;

  if (!nextShip) {
    return (
      <div>
        <p>The fleet is ready</p>
      </div>
    );
  }

  return (
    <div>
      <p>
        <span>Next ship: </span>
        { nextShip }
      </p>

      <p>
        <span>Ships left: </span>
        { availableShips.slice(1).join(', ') }
      </p>
    </div>
  );
}

NextShip.propTypes = {
  availableShips: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default NextShip;
