import reducer, {
  initialState,
  ADD_MEMBER,
  UPDATE_MEMBER_NAME,
  EDIT_DETAILS_ENTRY
} from 'member';

describe('Member reducer', () => {
  const member = 1;

  it(`Test ${ADD_MEMBER} action`, () => {
    const newMember = { id: member, teamId: 1 };
    const action = { type: ADD_MEMBER, payload: newMember };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      data: [...initialState.data, newMember]
    });
  });

  it(`Test ${UPDATE_MEMBER_NAME} action`, () => {
    const name = `test_member`;
    const action = { type: UPDATE_MEMBER_NAME, payload: { memberId: 1, name } };
    const newState = reducer(initialState, action);
    const updated = newState.data.find(item => item.id === 1);
    expect(updated.name).toMatch(name);
  });

  it(`Test ${EDIT_DETAILS_ENTRY} action`, () => {
    const action = { type: EDIT_DETAILS_ENTRY, payload: { name: 'bio', content: 'lorem ipsum', id: 1 } };
    const newState = reducer(initialState, action);
    const updated = newState.data.find(item => item.id === 1);
    expect(updated.details.bio).toMatch('lorem ipsum');
  });
});