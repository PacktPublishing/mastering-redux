import reducer, {
  initialState,
  SET_DETAILS_DATA,
  ADD_DETAILS_ENTRY,
  EDIT_DETAILS_ENTRY
} from 'details';

const defaultState = {
  ...initialState,
  data: {
    1: { id: 1, bio: 'Lorem ipsum', age: '21', _memberId: 1 }
  }
};

describe('Details reducer', () => {
  const detailsList = [{ id: 1, description: 'Lorem' }, { id: 2, bio: 'ipsum', _memberId: 1 }];
  it(`Test ${SET_DETAILS_DATA} action`, () => {
    const array = detailsList;
    const action = { type: SET_DETAILS_DATA, payload: array };
    const newState = reducer(defaultState, action);
    expect(newState.data).toEqual({
      1: array[0],
      2: array[1]
    });
  });

  it(`Test ${ADD_DETAILS_ENTRY} action`, () => {
    const details = detailsList[1];
    const action = { type: ADD_DETAILS_ENTRY, payload: details };
    const newState = reducer(defaultState, action);
    expect(newState.data).toEqual({
      ...defaultState.data,
      2: details
    });
  });

  it(`Test ${EDIT_DETAILS_ENTRY} action`, () => {
    const payload = { name: 'bio', content: 'My Life...', id: 1 };
    const action = { type: EDIT_DETAILS_ENTRY, payload };
    const newState = reducer(defaultState, action);
    expect(newState.data[1]).toEqual({
      ...defaultState.data[1],
      bio: payload.content
    });
  });
});
