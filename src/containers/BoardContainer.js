import { connect } from 'react-redux';
import Board from '../components/Board';
import getGameData from '../selector';

const mapStateToProps = state => ({
  gameData: getGameData(state),
});

const BoardContainer = connect(
  mapStateToProps,
)(Board);

export default BoardContainer;
