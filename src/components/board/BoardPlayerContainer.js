import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Board from './Board';

import { playerBoardData } from '../../selector';

const mapStateToProps = state => playerBoardData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

export default BoardContainer;
