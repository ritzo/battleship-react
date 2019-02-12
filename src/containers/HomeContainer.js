import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setName, addShip, play,
} from '../actions';
import Home from '../components/Home';
import getGameData from '../selector';

const mapStateToProps = state => ({
  gameData: getGameData(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setName, addShip, play }, dispatch),
});


const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
