import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  surrender, shoot, oponentTurn,
} from '../actions';
import Game from '../components/Game';
import { getGameData } from '../selector';

const mapStateToProps = state => getGameData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ surrender, shoot, oponentTurn }, dispatch),
});

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default GameContainer;
