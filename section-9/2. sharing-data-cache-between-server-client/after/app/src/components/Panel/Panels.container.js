import { connect } from 'react-redux';
import Panels from 'components/Panel/Panels';
import { getPanelColumns } from 'src/selectors';
import { withCacheContext } from 'components/Cache';

const mapStateToProps = (state, ownProps) => ({
  columns: getPanelColumns(state, ownProps.cache)
});

export default withCacheContext(connect(mapStateToProps)(Panels));
