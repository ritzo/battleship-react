import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Square from './Square';
import {
  shoot,
} from '../../actions';
import { editorSquaredData } from '../../selector';

const mapStateToProps = state => editorSquaredData(state);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ onClickHandler: shoot }, dispatch),
});

const SquareEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Square);

export default SquareEditorContainer;
