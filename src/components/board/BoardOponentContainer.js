import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Board from './Board';
import {
  shoot,
} from '../../actions';
import { oponentBoardData } from '../../selector';

const mapStateToProps = state => oponentBoardData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ onClickHandler: shoot }, dispatch),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

export default BoardContainer;
