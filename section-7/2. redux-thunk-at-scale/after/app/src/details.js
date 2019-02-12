import produce from 'immer';
import { createAction } from 'redux-actions';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';
import { ADD_MEMBER } from 'member';

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
        draft.data = {};
        action.payload.forEach(item => {
          draft.data[item.id] = item;
        })
      });
    }
    case ADD_MEMBER: {
      const { entry } = action.payload;
      return produce(state, draft => {
        draft.data[entry.id] = entry;
      });
    }
    case EDIT_DETAILS_ENTRY: {
      const { name, content, id } = action.payload;
      return produce(state, draft => {
        const entry = draft.data[id];
        entry[name] = content;
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setDetailsData = createAction(SET_DETAILS_DATA);
export const editDetailsEntry = createAction(EDIT_DETAILS_ENTRY);

// thunk

export const getDetailsData = () => async dispatch => {
  try {
    const details = await API('details');
    dispatch(setDetailsData(details));
  } catch (e) {
    console.error(e);
  }
};

export const patchDetailsEntry = ({ name, content, id }) => async (
  dispatch
) => {
  const newEntry = { [name]: content };
  try {
    await API.patch(`details/${id}`, newEntry);
    dispatch(editDetailsEntry({ name, content, id }));
  } catch (e) {
    console.error(e);
  }
};
