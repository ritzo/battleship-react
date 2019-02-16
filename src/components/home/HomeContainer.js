import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setName, play,
} from '../../actions';
import Home from './Home';
import { homeData } from '../../selector';

const mapStateToProps = state => homeData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setName, play }, dispatch),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
