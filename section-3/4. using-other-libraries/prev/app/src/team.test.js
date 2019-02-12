import reducer, {
  addToList,
  addToListInState,
  initialState,
  SET_ACTIVE_TEAM,
  SET_ACTIVE_LEAGUE
} from 'team';

describe('Team helper functions', () => {
  const list = [1, 2, 3, 4];

  it('Test addToList helper', () => {
    const newList = addToList(list, 5);
    expect(newList).not.toBe(list);
    expect(newList).toEqual([1, 2, 3, 4, 5]);
  });

  it('Test addToListInState helper', () => {
    const state = { list };
    const newState = addToListInState(state, 'list', 5);
    expect(newState).not.toBe(state);
    expect(newState).toEqual({ list: [1, 2, 3, 4, 5] });
  });
});

describe('Team reducer', () => {
  const team = 2;
  const league = 4;
  const state = { ...initialState, active_team: team };

  it(`Test ${SET_ACTIVE_TEAM} action`, () => {
    const action = { type: SET_ACTIVE_TEAM, payload: { team: 1 } };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active_team: 1 });
  });

  it(`Test ${SET_ACTIVE_LEAGUE} action`, () => {
    const action = { type: SET_ACTIVE_LEAGUE, payload: { league } };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active_league: league, active_team: null });
  });
});