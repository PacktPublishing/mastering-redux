import reducer, {
  initialState,
  ADD_MEMBER,
  UPDATE_MEMBER_NAME,
  EDIT_DETAILS_ENTRY, SET_MEMBER_DATA
} from 'member';
import { ADD_DETAILS_ENTRY } from 'details';

const defaultState = {
  ...initialState,
  data: {
    1: { id: 1, name: 'Member 1', teamId: 1 }
  }
};

describe('Member reducer', () => {
  it(`Test ${SET_MEMBER_DATA} action`, () => {
    const array = [
      { id: 1, name: 'Member 1', teamId: 1 },
      { id: 2, name: 'Member 2', teamId: 2 }
    ];
    const action = { type: SET_MEMBER_DATA, payload: array };
    const newState = reducer(defaultState, action);
    expect(newState.data).toEqual({
      1: array[0],
      2: array[1]
    });
  });

  it(`Test ${ADD_MEMBER} action`, () => {
    const memberId = Object.keys(defaultState.data).length + 1;
    const newMember = { id: memberId, teamId: 1 };
    const action = { type: ADD_MEMBER, payload: { member: newMember } };
    const newState = reducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      data: {
        ...defaultState.data,
        [memberId]: { name: 'New Member', ...newMember }
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
});
