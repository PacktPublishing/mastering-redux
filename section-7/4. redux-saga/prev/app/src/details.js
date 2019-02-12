import produce from 'immer';
import { handle } from 'redux-pack';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';
import { CREATE_MEMBER_AND_DETAILS } from 'member';

const reducerName = 'details';

export const GET_DETAILS_DATA = `mastering-redux/${reducerName}/GET_DETAILS_DATA`;
export const EDIT_DETAILS_ENTRY = `mastering-redux/${reducerName}/EDIT_DETAILS_ENTRY`;

export const initialState = {
  data: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_DATA: {
      return handle(state, action, {
        success: s => produce(s, draft => {
          draft.data = {};
          action.payload.forEach(item => {
            draft.data[item.id] = item;
          })
        })
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

// packs

export const getDetailsData = () => ({
  type: GET_DETAILS_DATA,
  promise: API('details')
});

export const patchDetailsEntry = ({ name, content, id }) => ({
  type: EDIT_DETAILS_ENTRY,
  promise: API.patch(`details/${id}`, { [name]: content })
});
