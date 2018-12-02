import produce from 'immer';
import { createAction } from 'redux-actions';

export const ADD_MEMBER = 'mastering-redux/member/ADD_MEMBER';
export const UPDATE_MEMBER_NAME = 'mastering-redux/member/UPDATE_MEMBER_NAME';
export const EDIT_DETAILS_ENTRY =
  'mastering-redux/member/EDIT_DETAILS_ENTRY';

const defaultMember = { name: 'New Member' };
const defaultDetails = { bio: '', age: '' };
export const initialState = {
  data: {
    1: { id: 1, name: 'Member 1', teamId: 1 }
  },
  details: {
    1: defaultDetails
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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

export const addMember = createAction(ADD_MEMBER);
export const updateMemberName = createAction(
  UPDATE_MEMBER_NAME,
  (name, memberId) => ({ name, memberId })
);
export const editDetailsEntry = createAction(EDIT_DETAILS_ENTRY);
