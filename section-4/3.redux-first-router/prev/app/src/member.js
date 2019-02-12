import produce from 'immer';
import { createAction } from 'redux-actions';

export const ADD_MEMBER = 'mastering-redux/member/ADD_MEMBER';
export const UPDATE_MEMBER_NAME = 'mastering-redux/member/UPDATE_MEMBER_NAME';
export const EDIT_DETAILS_ENTRY =
  'mastering-redux/member/EDIT_DETAILS_ENTRY';

export const initialState = {
  data: [{ id: 1, name: 'Member 1', teamId: 1, details: { bio: '', age: '' } }]
};

export const updateListInState = (data, id, name) => {
  const toUpdate = data.find(m => m.id === id);
  toUpdate.name = name;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEMBER: {
      const member = action.payload;
      return produce(state, draft => {
        draft.data.push(member);
      });
    }
    case UPDATE_MEMBER_NAME: {
      const { name, memberId } = action.payload;
      return produce(state, draft =>
        updateListInState(draft.data, memberId, name)
      );
    }
    case EDIT_DETAILS_ENTRY: {
      const { name, content, id } = action.payload;
      return produce(state, draft => {
        const item = draft.data.find(i => i.id === parseInt(id, 10));
        item.details[name] = content;
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
