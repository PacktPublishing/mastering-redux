import produce from 'immer';
import { handle } from 'redux-pack';
import { createAction } from 'redux-actions';

import reducerRegistry from 'src/reducerRegistry';
import API from 'src/api.service';
import { CREATE_MEMBER_AND_DETAILS } from 'src/member/member';

const reducerName = 'details';

export const EDIT_DETAILS_ENTRY = `mastering-redux/${reducerName}/EDIT_DETAILS_ENTRY`;
export const SET_DETAILS_LOADING = `mastering-redux/${reducerName}/SET_DETAILS_LOADING`;

export const initialState = {
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MEMBER_AND_DETAILS: {
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          })
      });
    }
    case EDIT_DETAILS_ENTRY: {
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          })
      });
    }
    case SET_DETAILS_LOADING: {
      return { ...state, loading: action.payload };
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setDetailsLoading = createAction(SET_DETAILS_LOADING);

// packs

export const patchDetailsEntry = ({ name, content, id }) => ({
  type: EDIT_DETAILS_ENTRY,
  promise: API.patch(`details/${id}`, { [name]: content })
});
