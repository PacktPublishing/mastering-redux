import { LIFECYCLE } from 'redux-pack';
import { makePackAction } from 'src/store-utils';
import reducer, {
  initialState,
  GET_TEAM_DATA,
  SET_ACTIVE_TEAM,
  ADD_TEAM,
  UPDATE_TEAM_NAME
} from 'src/team/team';
import { SET_ACTIVE_LEAGUE } from 'src/league/league';
import { CREATE_MEMBER_AND_DETAILS } from 'src/member/member';

const defaultState = {
  ...initialState
};

describe('Team reducer', () => {
  const state = { ...defaultState, active: 2 };

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
    const teamId = 2;
    const newTeam = { id: teamId, leagueId: 5 };
    const action = makePackAction(LIFECYCLE.SUCCESS, {
      type: ADD_TEAM,
      payload: newTeam
    });
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      active: null
    });
  });

  it(`Test ${CREATE_MEMBER_AND_DETAILS} action`, () => {
    const newMember = { teamId: 3 };
    const action = makePackAction(LIFECYCLE.SUCCESS, {
      type: CREATE_MEMBER_AND_DETAILS,
      payload: { member: newMember }
    });
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      active: 3
    });
  });
});
