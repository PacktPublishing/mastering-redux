import reducer, {
  addToList,
  addToListInState,
  initialState,
  SET_ACTIVE_TEAM,
  SET_ACTIVE_LEAGUE,
  ADD_TEAM,
  ADD_MEMBER,
  UPDATE_LEAGUE_NAME,
  UPDATE_MEMBER_NAME,
  UPDATE_TEAM_NAME
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
  const member = 1;
  const team = 2;
  const league = 4;
  const state = { ...initialState, active_team: team, active_league: league };

  it(`Test ${SET_ACTIVE_TEAM} action`, () => {
    const action = { type: SET_ACTIVE_TEAM, payload: { team: 1 } };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active_team: 1 });
  });

  it(`Test ${SET_ACTIVE_LEAGUE} action`, () => {
    const action = { type: SET_ACTIVE_LEAGUE, payload: { league: 3 } };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active_league: 3, active_team: null });
  });

  it(`Test ${ADD_TEAM} action`, () => {
    const newTeam = { id: team, leagueId: 5 };
    const action = { type: ADD_TEAM, payload: { team: newTeam } };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      teams: [...state.teams, newTeam],
      active_league: newTeam.leagueId
    });
  });

  it(`Test ${ADD_MEMBER} action`, () => {
    const newMember = { id: member, teamId: 3 };
    const action = { type: ADD_MEMBER, payload: { member: newMember } };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      members: [...state.members, newMember],
      active_team: newMember.teamId
    });
  });

  test.each([
    [UPDATE_MEMBER_NAME, 'member'],
    [UPDATE_TEAM_NAME, 'team'],
    [UPDATE_LEAGUE_NAME, 'league']
  ])('Test %s action', (type, key) => {
    const name = `test_${key}`;
    const list = `${key}s`;
    const action = { type, payload: { [`${key}Id`]: 1, name } };
    const newState = reducer(initialState, action);
    const updated = newState[list].find(item => item.id === 1);
    expect(updated.name).toMatch(name);
  });
});