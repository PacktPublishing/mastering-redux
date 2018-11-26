// CALENDAR - CONTAINER COMPONENT
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Calendar from 'components/calendar';

function mapStateToProps(state, ownProps) {
  const activeContact = state.contacts[ownProps.activeContactId];
  const events = sortBy(state.event, ownProps.sortBy);

  return { activeContact, events };
}

export default connect(mapStateToProps)(Calendar);
