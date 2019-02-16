import { connect } from 'react-redux';

import NextShip from './NextShip';

function mapStateToProps(state) {
  return {
    availableShips: state.availableShips,
  };
}

const NextShipContainer = connect(
  mapStateToProps,
)(NextShip);

export default NextShipContainer;
