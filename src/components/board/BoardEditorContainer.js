import { connect } from 'react-redux';

import Board from './Board';

import { editorBoardData } from '../../selector';

const mapStateToProps = state => editorBoardData(state);

const BoardContainer = connect(
  mapStateToProps,
)(Board);

export default BoardContainer;
