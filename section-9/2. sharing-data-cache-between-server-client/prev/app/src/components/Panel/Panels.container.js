import { connect } from 'react-redux';
import Panels from 'components/Panel/Panels';
import { getPanelColumns } from 'src/selectors';

const mapStateToProps = state => ({
  columns: getPanelColumns(state)
});

export default connect(mapStateToProps)(Panels);
