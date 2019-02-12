import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setupBoard } from '../actions';
import GameOver from '../components/GameOver';
import getGameData from '../selector';

const mapStateToProps = state => ({
  gameData: getGameData(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setupBoard }, dispatch),
});


const GameOverContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameOver);

export default GameOverContainer;
