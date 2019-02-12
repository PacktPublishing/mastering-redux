import reducer, {
  initialState,
  SET_ACTIVE_LEAGUE,
  UPDATE_LEAGUE_NAME,
} from 'league';
import { ADD_TEAM } from 'team';

describe('League reducer', () => {
  const league = 4;
  const state = { ...initialState, active: league };

  it(`Test ${SET_ACTIVE_LEAGUE} action`, () => {
    const action = { type: SET_ACTIVE_LEAGUE, payload: 3 };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active: 3 });
  });

  test(`Test ${UPDATE_LEAGUE_NAME} action`, () => {
    const name = `test_league`;
    const action = { type: UPDATE_LEAGUE_NAME, payload: { leagueId: 1, name } };
    const newState = reducer(initialState, action);
    const updated = newState.data.find(item => item.id === 1);
    expect(updated.name).toMatch(name);
  });

  it(`Test ${ADD_TEAM} action`, () => {
    const newTeam = { id: 1, leagueId: 5 };
    const action = { type: ADD_TEAM, payload: newTeam };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      active: 5
    });
  });
});