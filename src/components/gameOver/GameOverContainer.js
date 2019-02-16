import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setupBoard } from '../../actions';
import GameOver from './GameOver';
import { gameOverData } from '../../selector';

const mapStateToProps = state => gameOverData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setupBoard }, dispatch),
});

const GameOverContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameOver);

export default GameOverContainer;
