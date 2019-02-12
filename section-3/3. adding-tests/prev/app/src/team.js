const SET_ACTIVE_TEAM = 'mastering-redux/team/SET_ACTIVE_TEAM';
const SET_ACTIVE_LEAGUE = 'mastering-redux/team/SET_ACTIVE_LEAGUE';
const ADD_MEMBER = 'mastering-redux/team/ADD_MEMBER';
const ADD_TEAM = 'mastering-redux/team/ADD_TEAM';

const initialState = {
  members: [
    { id: 1, name: 'Member 1', teamId: 1 }
  ],
  teams: [
    { id: 1, name: 'Team 1', leagueId: 1 }
  ],
  leagues: [
    { id: 1, name: 'League 1' },
    { id: 2, name: 'League 2' }
  ],
  active_league: null,
  active_team: null
};

const addToList = (list, item) => [...list, item];

const addToListInState = (state, key, value) => {
  return {
    ...state,
    [key]: addToList(state[key], value)
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LEAGUE: {
      return { ...state, active_league: action.payload.league, active_team: null };
    }
    case SET_ACTIVE_TEAM: {
      return { ...state, active_team: action.payload.team };
    }
    case ADD_MEMBER: {
      return { ...state, members: addToList(state.members, action.payload.member) };
    }
    case ADD_TEAM: {
      return addToListInState(state, 'teams', action.payload.team);
    }
    default:
      return state;
  }
}

export const setActiveTeam = team => ({
  type: SET_ACTIVE_TEAM,
  payload: {
    team: team.id
  }
});

export const setActiveLeague = league => ({
  type: SET_ACTIVE_LEAGUE,
  payload: {
    league: league.id
  }
});

export const addMember = member => ({
  type: ADD_MEMBER,
  payload: { member }
});

export const addTeam = team => ({
  type: ADD_TEAM,
  payload: { team }
});
