import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Board from '../components/Board';
import {
  addShip,
} from '../actions';
import { editorBoardData } from '../selector';

const mapStateToProps = state => editorBoardData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ onClickHandler: addShip }, dispatch),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

export default BoardContainer;
