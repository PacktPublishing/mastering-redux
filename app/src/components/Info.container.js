import { connect } from 'react-redux';
import Info from 'components/Info';
import { editDetailsEntry } from 'member';

const mapStateToProps = state => {
  const { payload: { level, id } } = state.location;
  const entity = state[level] || {};
  const details = entity.details ? entity.details[id] : null;
  return {
    id,
    details,
    name: level
  }
};

const mapDispatchToProps = {
  edit: editDetailsEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
