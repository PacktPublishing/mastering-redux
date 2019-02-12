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
        action.payload.forEach(({ details, ...item }) => {
          draft.data[item.id] = item;
          draft.details[item.id] = details || defaultDetails;
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
  if (members) dispatch(setMemberData(members));
};

export const postMemberData = ({ teamId }) => async (dispatch, getState) => {
  const { data } = getState().member;
  const memberId = Object.keys(data).length + 1;
  const member = { ...defaultMember, teamId, id: memberId, details: defaultDetails };

  await API.post('members', member);

  dispatch(addMember({ teamId }));
};

export const putMemberName = (name, memberId) => async (dispatch, getState) => {
  const { data } = getState().member;
  const newMember = { ...data[memberId], name };
  await API.put(`members/${memberId}`, newMember);

  dispatch(updateMemberName(name, memberId));
};

export const putMemberDetails = ({ name, content, id }) => async (dispatch, getState) => {
  const { details, data } = getState().member;
  const newMember = { ...data[id], details: { ...details[id], [name]: content } };
  await API.put(`members/${id}`, newMember);

  dispatch(editDetailsEntry({ name, content, id }));
};
