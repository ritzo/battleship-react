import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Board from '../components/Board';
import {
  shoot,
} from '../actions';
import getGameData from '../selector';

const mapStateToProps = state => ({
  gameData: getGameData(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ onClickHandler: shoot }, dispatch),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

export default BoardContainer;
