import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './NextShip.css';

// eslint-disable-next-line react/prefer-stateless-function
class NextShip extends React.Component {
  render() {
    const { availableShips } = this.props;
    const [nextShip] = availableShips;

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
}

NextShip.propTypes = {
  availableShips: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function mapStateToProps(state) {
  return {
    availableShips: state.availableShips,
  };
}

export default connect(mapStateToProps)(NextShip);
