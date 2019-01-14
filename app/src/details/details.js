import produce from 'immer';
import { createAction } from 'redux-actions';
import { handle } from 'redux-pack';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';
import { CREATE_MEMBER_AND_DETAILS } from 'member/member';

const reducerName = 'details';

export const SET_DETAILS_DATA = `mastering-redux/${reducerName}/SET_DETAILS_DATA`;
export const EDIT_DETAILS_ENTRY = `mastering-redux/${reducerName}/EDIT_DETAILS_ENTRY`;

export const initialState = {
  data: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DETAILS_DATA: {
      return produce(state, draft => {
        draft.data = action.payload;
      });
    }
    case CREATE_MEMBER_AND_DETAILS: {
      return handle(state, action, {
        success: s => produce(s, draft => {
          const { entry } = action.payload;
          draft.data[entry.id] = entry;
        })
      });
    }
    case EDIT_DETAILS_ENTRY: {
      return handle(state, action, {
        success: s => produce(s, draft => {
          const entry = action.payload;
          Object.assign(draft.data[entry.id], entry);
        })
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setDetailsData = createAction(SET_DETAILS_DATA);

// packs

export const patchDetailsEntry = ({ name, content, id }) => ({
  type: EDIT_DETAILS_ENTRY,
  promise: API.patch(`details/${id}`, { [name]: content })
});
