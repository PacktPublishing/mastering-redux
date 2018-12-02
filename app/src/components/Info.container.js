import { connect } from 'react-redux';
import Info from 'components/Info';
import { editDetailsEntry } from 'member';

const mapStateToProps = state => {
  const { payload: { level, id } } = state.location;
  const key = level.slice(0, -1);
  const item = state[key].data.find(i => i.id === parseInt(id, 10));
  return {
    item,
    name: level
  }
};

const mapDispatchToProps = {
  edit: editDetailsEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
