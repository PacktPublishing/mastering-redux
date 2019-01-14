import { LIFECYCLE } from 'redux-pack';
import reducer, {
  initialState,
  GET_LEAGUE_DATA,
  SET_ACTIVE_LEAGUE,
  UPDATE_LEAGUE_NAME,
} from 'league/league';
import { ADD_TEAM } from 'team/team';
import { makePackAction } from 'store-utils';

const defaultState = {
  ...initialState,
  data: {
    1: { id: 1, name: 'League 1' },
    2: { id: 2, name: 'League 2' }
  }
};

describe('League reducer', () => {
  const league = 4;
  const state = { ...defaultState, active: league };

  it(`Test ${GET_LEAGUE_DATA} action`, () => {
    const array = [
      { id: 1, name: 'League 1' },
      { id: 2, name: 'League 2' }
    ];
    const action = makePackAction(LIFECYCLE.SUCCESS, { type: GET_LEAGUE_DATA, payload: array });
    const newState = reducer(state, action);
    expect(newState.data).toEqual({
      1: array[0],
      2: array[1]
    });
  });

  it(`Test ${SET_ACTIVE_LEAGUE} action`, () => {
    const action = { type: SET_ACTIVE_LEAGUE, payload: 3 };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active: 3 });
  });

  test(`Test ${UPDATE_LEAGUE_NAME} action`, () => {
    const name = `test_league`;
    const action = { type: UPDATE_LEAGUE_NAME, payload: { leagueId: 1, name } };
    const newState = reducer(defaultState, action);
    const updated = newState.data[1];
    expect(updated.name).toMatch(name);
  });

  it(`Test ${ADD_TEAM} action`, () => {
    const newTeam = { id: 1, leagueId: 5 };
    const action = makePackAction(LIFECYCLE.SUCCESS, { type: ADD_TEAM, payload: newTeam });
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      active: 5
    });
  });
});
