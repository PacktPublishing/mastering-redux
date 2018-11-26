import { connect } from 'react-redux';
import Info from 'components/Info';

const mapStateToProps = state => {
  const { payload: { level, id } } = state.location;
  const key = level.slice(0, -1);
  const item = state[key].data.find(i => i.id === parseInt(id, 10));
  return {
    item,
    name: level
  }
};

export default connect(mapStateToProps)(Info);