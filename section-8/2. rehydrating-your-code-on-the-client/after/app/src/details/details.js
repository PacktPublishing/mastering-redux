import produce from 'immer';
import { handle } from 'redux-pack';
import reducerRegistry from 'src/reducerRegistry';
import API from 'src/api.service';
import {
  CREATE_MEMBER_AND_DETAILS,
  SET_MEMBER_WITH_DETAILS_ENTRY
} from 'src/member/member';

const reducerName = 'details';

export const EDIT_DETAILS_ENTRY = `mastering-redux/${reducerName}/EDIT_DETAILS_ENTRY`;

export const initialState = {
  data: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MEMBER_AND_DETAILS: {
      return handle(state, action, {
        success: s =>
          produce(s, draft => {
            const { entry } = action.payload;
            draft.data[entry.id] = entry;
          })
      });
    }
    case EDIT_DETAILS_ENTRY: {
      return handle(state, action, {
        success: s =>
          produce(s, draft => {
            const entry = action.payload;
            Object.assign(draft.data[entry.id], entry);
          })
      });
    }
    case SET_MEMBER_WITH_DETAILS_ENTRY: {
      const { details } = action.payload;
      return produce(state, draft => {
        draft.data = details;
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// packs

export const patchDetailsEntry = ({ name, content, id }) => ({
  type: EDIT_DETAILS_ENTRY,
  promise: API.patch(`details/${id}`, { [name]: content })
});
