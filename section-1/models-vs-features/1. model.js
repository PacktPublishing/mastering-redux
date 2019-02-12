// CONTACTS - MODEL
import {
  UPDATE_CONTACT_NAME,
  SET_CONTACTS,
  REMOVE_CONTACT
} from 'models-vs-features/constants';

const contactsInitialState = {
    contactsById: {}
};

export function contactsReducer(state = contactsInitialState, action) {
    switch (action.type) {
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
        default:
            return state;
    }
}



// EVENTS MODEL
import { UPDATE_EVENT_TYPE, SET_EVENTS, REMOVE_EVENT } from 'models-vs-features/constants';

const eventsInitialState = {
  eventsById: {}
};

export function eventsReducer(state = eventsInitialState, action) {
  switch (action.type) {
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