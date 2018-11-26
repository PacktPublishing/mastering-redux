// CALENDAR PAGE - FEATURE
import {
  REMOVE_CONTACT,
  REMOVE_EVENT,
  SET_CONTACTS,
  SET_EVENTS,
  UPDATE_CONTACT_NAME,
  UPDATE_EVENT_TYPE,
  SET_SELECTED_CONTACT,
  SET_SELECTED_EVENT,
  SET_SORT_BY,
  SET_MODAL_OPEN
} from 'models-vs-features/constants';

const calendarInitialState = {
  contactsById: {},
  eventsById: {},
  selectedEvent: null,
  selectedContact: null,
  sortBy: ['name'],
  modalOpen: false
};

export default function reducer(state = calendarInitialState, action) {
  switch (action.type) {
    case SET_SELECTED_CONTACT:
      return { ...state, selectedContact: action.payload };
    case SET_SELECTED_EVENT:
      return { ...state, selectedEvent: action.payload };
    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case SET_MODAL_OPEN:
      return { ...state, modalOpen: action.payload };

// contacts actions
    case SET_CONTACTS:
      return { ...state, contactsById: action.payload };
    case UPDATE_CONTACT_NAME: {
      const { contactId, name } = action.payload;
      const contact = { ...state.contactsById[contactId], name };
      const contactsById = { ...state.contactsById, [contactId]: contact };
      return { ...state, contactsById };
    }
    case REMOVE_CONTACT:
      const contactId = action.payload;
      const contactsById = state.contactsById.filter(contact => contact.id !== contactId);
      return { ...state, contactsById };

// events actions
    case SET_EVENTS:
      return { ...state, eventsById: action.payload };
    case UPDATE_EVENT_TYPE: {
      const { eventId, name } = action.payload;
      const contact = { ...state.eventsById[eventId], name };
      const eventsById = { ...state.eventsById, [eventId]: contact };
      return { ...state, eventsById };
    }
    case REMOVE_EVENT:
      const eventId = action.payload;
      const eventsById = state.eventsById.filter(event => event.id !== eventId);
      return { ...state, eventsById };

    default:
      return state;
  }
}