import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  surrender, oponentTurn,
} from '../../actions';
import Game from './Game';
import { gameData } from '../../selector';

const mapStateToProps = state => gameData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ surrender, oponentTurn }, dispatch),
});

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default GameContainer;
