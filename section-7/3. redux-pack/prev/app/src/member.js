import produce from 'immer';
import { delay } from 'lodash-es';
import { createAction } from 'redux-actions';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';


const reducerName = 'member';

export const SET_MEMBER_DATA = `mastering-redux/${reducerName}/SET_MEMBER_DATA`;
export const SET_MEMBER_LOADING = `mastering-redux/${reducerName}/SET_MEMBER_LOADING`;
export const ADD_MEMBER = `mastering-redux/${reducerName}/ADD_MEMBER`;
export const UPDATE_MEMBER_NAME = `mastering-redux/${reducerName}/UPDATE_MEMBER_NAME`;

const defaultMember = { name: 'New Member' };
const defaultDetails = { bio: '', age: '' };
export const initialState = {
  data: {},
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBER_LOADING: {
      return produce(state, draft => {
        draft.loading = action.payload;
      });
    }
    case SET_MEMBER_DATA: {
      return produce(state, draft => {
        draft.data = {};
        action.payload.forEach(item => {
          draft.data[item.id] = item;
          draft.loading = false;
        });
      });
    }
    case ADD_MEMBER: {
      const { member } = action.payload;
      return produce(state, draft => {
        draft.data[member.id] = { ...defaultMember, ...member };
        draft.loading = false;
      });
    }
    case UPDATE_MEMBER_NAME: {
      const { name, memberId } = action.payload;
      return produce(state, draft => {
        draft.data[memberId].name = name;
        draft.loading = false;
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setMemberData = createAction(SET_MEMBER_DATA);
export const setMemberLoading = createAction(SET_MEMBER_LOADING);
export const addMember = createAction(ADD_MEMBER);
export const updateMemberName = createAction(
  UPDATE_MEMBER_NAME,
  (name, memberId) => ({ name, memberId })
);

// thunk

export const getMemberData = () => async dispatch => {
  dispatch(setMemberLoading(true));
  try {
    const members = await API('members');
    dispatch(setMemberData(members));
  } catch (e) {
    console.error(e);
    delay(() => dispatch(setMemberLoading(false)), 700);
  }
};

export const createMemberAndDetails = ({ teamId }) => dispatch => {
  const member = { ...defaultMember, teamId };
  dispatch(setMemberLoading(true));
  API.post('members', member)
    .then(memberResponse => {
      const entry = { ...defaultDetails, _memberId: memberResponse.id };
      return API.post('details', entry)
        .then(entryResponse => {
          const newMember = { ...member, id: memberResponse.id };
          const newEntry = { ...entry, id: entryResponse.id };
          dispatch(addMember({ member: newMember, entry: newEntry }));
        });
    })
    .catch(e => {
      console.error(e);
      delay(() => dispatch(setMemberLoading(false)), 700);
    });
};

export const patchMemberName = (name, memberId) => async dispatch => {
  const newMember = { name };
  dispatch(setMemberLoading(true));
  try {
    await API.patch(`members/${memberId}`, newMember);
    dispatch(updateMemberName(name, memberId));
  } catch (e) {
    console.error(e);
    delay(() => dispatch(setMemberLoading(false)), 700);
  }
};
