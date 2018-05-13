import { connect } from 'react-redux';
import actions from '_data/actions';
import UploadedPanel from '_components/UploadedPanel';

const mapStateToProps = state => ({
  regiId: state.file.regiId,
});

const mapDispatchToProps = dispatch => ({
  emptyRegiId: () => dispatch(actions.emptyRegiId()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadedPanel);