import { LIFECYCLE } from 'redux-pack';
import reducer, {
  initialState,
  GET_DETAILS_DATA,
  EDIT_DETAILS_ENTRY
} from 'details/details';

import { CREATE_MEMBER_AND_DETAILS } from 'member/member';

import { makePackAction } from 'store-utils';

const defaultState = {
  ...initialState,
  data: {
    1: { id: 1, bio: 'Lorem ipsum', age: '21', _memberId: 1 }
  }
};

describe('Details reducer', () => {
  const detailsList = [{ id: 1, description: 'Lorem' }, { id: 2, bio: 'ipsum', _memberId: 1 }];

  it(`Test ${CREATE_MEMBER_AND_DETAILS} action`, () => {
    const entry = detailsList[1];
    const action = makePackAction(LIFECYCLE.SUCCESS, { type: CREATE_MEMBER_AND_DETAILS, payload: { entry } });
    const newState = reducer(defaultState, action);
    expect(newState.data).toEqual({
      ...defaultState.data,
      2: entry
    });
  });

  it(`Test ${EDIT_DETAILS_ENTRY} action`, () => {
    const payload = { bio: 'My Life...', id: 1 };
    const action = makePackAction(LIFECYCLE.SUCCESS, { type: EDIT_DETAILS_ENTRY, payload });
    const newState = reducer(defaultState, action);
    expect(newState.data[1]).toEqual({
      ...defaultState.data[1],
      bio: payload.bio
    });
  });
});
