import reducer, {
  initialState,
  ADD_MEMBER,
  UPDATE_MEMBER_NAME,
  EDIT_DETAILS_ENTRY
} from 'member';

describe('Member reducer', () => {

  it(`Test ${ADD_MEMBER} action`, () => {
    const memberId = Object.keys(initialState.data).length + 1;
    const newMember = { teamId: 1 };
    const action = { type: ADD_MEMBER, payload: newMember };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      data: { ...initialState.data, [memberId]: { id: memberId, name: 'New Member', ...newMember } }
    });
  });

  it(`Test ${UPDATE_MEMBER_NAME} action`, () => {
    const name = `test_member`;
    const action = { type: UPDATE_MEMBER_NAME, payload: { memberId: 1, name } };
    const newState = reducer(initialState, action);
    const updated = newState.data[1];
    expect(updated.name).toMatch(name);
  });

  it(`Test ${EDIT_DETAILS_ENTRY} action`, () => {
    const action = { type: EDIT_DETAILS_ENTRY, payload: { name: 'bio', content: 'lorem ipsum', id: 1 } };
    const newState = reducer(initialState, action);
    const updated = newState.details[1];
    expect(updated.bio).toMatch('lorem ipsum');
  });
});