import reducer, {
  initialState,
  ADD_MEMBER,
  UPDATE_MEMBER_NAME,
  EDIT_DETAILS_ENTRY
} from 'member';

const defaultState = {
  ...initialState,
  data: {
    1: { id: 1, name: 'Member 1', teamId: 1 }
  },
  details: {
    1: { bio: '', age: '' }
  }
};

describe('Member reducer', () => {

  it(`Test ${ADD_MEMBER} action`, () => {
    const memberId = Object.keys(defaultState.data).length + 1;
    const newMember = { teamId: 1 };
    const action = { type: ADD_MEMBER, payload: newMember };
    const newState = reducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      data: {
        ...defaultState.data,
        [memberId]: { id: memberId, name: 'New Member', ...newMember }
      },
      details: {
        ...defaultState.details,
        2: { bio: '', age: '' }
      }
    });
  });

  it(`Test ${UPDATE_MEMBER_NAME} action`, () => {
    const name = `test_member`;
    const action = { type: UPDATE_MEMBER_NAME, payload: { memberId: 1, name } };
    const newState = reducer(defaultState, action);
    const updated = newState.data[1];
    expect(updated.name).toMatch(name);
  });

  it(`Test ${EDIT_DETAILS_ENTRY} action`, () => {
    const action = { type: EDIT_DETAILS_ENTRY, payload: { name: 'bio', content: 'lorem ipsum', id: 1 } };
    const newState = reducer(defaultState, action);
    const updated = newState.details[1];
    expect(updated.bio).toMatch('lorem ipsum');
  });
});
