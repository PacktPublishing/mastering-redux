import produce from 'immer';
import { createAction } from 'redux-actions';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';

const reducerName = 'member';

export const SET_MEMBER_DATA = `mastering-redux/${reducerName}/SET_MEMBER_DATA`;
export const ADD_MEMBER = `mastering-redux/${reducerName}/ADD_MEMBER`;
export const UPDATE_MEMBER_NAME = `mastering-redux/${reducerName}/UPDATE_MEMBER_NAME`;
export const EDIT_DETAILS_ENTRY = `mastering-redux/${reducerName}/EDIT_DETAILS_ENTRY`;

const defaultMember = { name: 'New Member' };
const defaultDetails = { bio: '', age: '' };
export const initialState = {
  data: {},
  details: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBER_DATA: {
      return produce(state, draft => {
        action.payload.forEach(item => {
          draft.data[item.id] = item;
          draft.details[item.id] = defaultDetails;
        })
      });
    }
    case ADD_MEMBER: {
      const { teamId } = action.payload;
      return produce(state, draft => {
        const memberId = Object.keys(draft.data).length + 1;
        draft.data[memberId] = { ...defaultMember, teamId, id: memberId };
        draft.details[memberId] = defaultDetails;
      });
    }
    case UPDATE_MEMBER_NAME: {
      const { name, memberId } = action.payload;
      return produce(state, draft => {
        draft.data[memberId].name = name;
      });
    }
    case EDIT_DETAILS_ENTRY: {
      const { name, content, id } = action.payload;
      return produce(state, draft => {
        const itemDetails = draft.details[id];
        itemDetails[name] = content;
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setMemberData = createAction(SET_MEMBER_DATA);
export const addMember = createAction(ADD_MEMBER);
export const updateMemberName = createAction(
  UPDATE_MEMBER_NAME,
  (name, memberId) => ({ name, memberId })
);
export const editDetailsEntry = createAction(EDIT_DETAILS_ENTRY);

// thunk

export const getMemberData = () => async dispatch => {
  const members = await API('members');
  dispatch(setMemberData(members));
};
