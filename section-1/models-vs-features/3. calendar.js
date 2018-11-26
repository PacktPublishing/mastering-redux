// CALENDAR - MODEL
import {
  SET_CURRENT_DATE,
  SET_CALENDAR_VIEW
} from 'models-vs-features/constants';

const calendarInitialState = {
  currentDate: Date.now(),
  calendarView: calendarViews.DAY
};

export function calendarReducer(state = calendarInitialState, action) {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    case SET_CALENDAR_VIEW:
      return { ...state, calendarView: action.payload };
    default:
      return state;
  }
}