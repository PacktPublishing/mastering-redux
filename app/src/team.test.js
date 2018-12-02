import reducer, {
  initialState,
  SET_ACTIVE_TEAM,
  ADD_TEAM,
  UPDATE_TEAM_NAME
} from 'team';
import { SET_ACTIVE_LEAGUE } from 'league';
import { ADD_MEMBER } from 'member';

describe('Team reducer', () => {
  const state = { ...initialState, active: 2 };

  it(`Test ${SET_ACTIVE_TEAM} action`, () => {
    const action = { type: SET_ACTIVE_TEAM, payload: 1 };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active: 1 });
  });

  it(`Test ${SET_ACTIVE_LEAGUE} action`, () => {
    const action = { type: SET_ACTIVE_LEAGUE, payload: { league: 3 } };
    const newState = reducer(state, action);
    expect(newState).toEqual({ ...state, active: null });
  });

  it(`Test ${ADD_TEAM} action`, () => {
    const teamId = Object.keys(initialState.data).length + 1;
    const newTeam = { leagueId: 5 };
    const action = { type: ADD_TEAM, payload: newTeam };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      data: { ...state.data, [teamId]: { id: teamId, name: 'New Team', ...newTeam } }
    });
  });

  it(`Test ${ADD_MEMBER} action`, () => {
    const newMember = { teamId: 3 };
    const action = { type: ADD_MEMBER, payload: newMember };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      active: 3
    });
  });

  test(`Test ${UPDATE_TEAM_NAME} action`, () => {
    const name = `test_team`;
    const action = { type: UPDATE_TEAM_NAME, payload: { teamId: 1, name } };
    const newState = reducer(initialState, action);
    const updated = newState.data[1];
    expect(updated.name).toMatch(name);
  });
});