import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Square from './Square';
import { playerSquaredData } from '../../selector';

const mapStateToProps = state => playerSquaredData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ onClickHandler: null }, dispatch),
});

const SquareEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Square);

export default SquareEditorContainer;
