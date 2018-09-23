// CALENDAR - CONTAINER COMPONENT
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Caldendar from 'components/calendar';

function mapStateToProps(state, { activeContactId, sortBy }) {
  const activeContact = state.contacts[ownState.activeContactId];
  const events = sortBy(state.event, sortBy);

  return { activeContact, events };
}

export default connect(mapStateToProps)(Caldendar);
