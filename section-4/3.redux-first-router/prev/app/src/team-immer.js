import produce from 'immer';

export const SET_ACTIVE_TEAM = 'mastering-redux/team/SET_ACTIVE_TEAM';
export const SET_ACTIVE_LEAGUE = 'mastering-redux/team/SET_ACTIVE_LEAGUE';
export const ADD_MEMBER = 'mastering-redux/team/ADD_MEMBER';
export const ADD_TEAM = 'mastering-redux/team/ADD_TEAM';
export const UPDATE_MEMBER_NAME = 'mastering-redux/team/UPDATE_MEMBER_NAME';
export const UPDATE_TEAM_NAME = 'mastering-redux/team/UPDATE_TEAM_NAME';
export const UPDATE_LEAGUE_NAME = 'mastering-redux/team/UPDATE_LEAGUE_NAME';

export const initialState = {
  members: [{ id: 1, name: 'Member 1', teamId: 1 }],
  teams: [{ id: 1, name: 'Team 1', leagueId: 1 }],
  leagues: [{ id: 1, name: 'League 1' }, { id: 2, name: 'League 2' }],
  active_league: null,
  active_team: null
};

export const updateListInState = (draft, key, id, name) => {
  const toUpdate = draft[key].find(m => m.id === id);
  toUpdate.name = name;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LEAGUE: {
      return produce(state, draft => {
        draft.active_league = action.payload.league;
        draft.active_team = null;
      });
    }
    case SET_ACTIVE_TEAM: {
      return produce(state, draft => {
        draft.active_team = action.payload.team;
      });
    }
    case ADD_MEMBER: {
      const { member } = action.payload;
      return produce(state, draft => {
        draft.members.push(member);
        draft.active_team = member.teamId;
      });
    }
    case ADD_TEAM: {
      const { team } = action.payload;
      return produce(state, draft => {
        draft.teams.push(team);
        draft.active_league = team.leagueId;
      });
    }
    case UPDATE_MEMBER_NAME: {
      const { name, memberId } = action.payload;
      return produce(state, draft =>
        updateListInState(draft, 'members', memberId, name)
      );
    }
    case UPDATE_TEAM_NAME: {
      const { name, teamId } = action.payload;
      return produce(state, draft =>
        updateListInState(draft, 'teams', teamId, name)
      );
    }
    case UPDATE_LEAGUE_NAME: {
      const { name, leagueId } = action.payload;
      return produce(state, draft =>
        updateListInState(draft, 'leagues', leagueId, name)
      );
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

export const updateMemberName = (name, memberId) => ({
  type: UPDATE_MEMBER_NAME,
  payload: { name, memberId }
});

export const updateTeamName = (name, teamId) => ({
  type: UPDATE_TEAM_NAME,
  payload: { name, teamId }
});

export const updateLeagueName = (name, leagueId) => ({
  type: UPDATE_LEAGUE_NAME,
  payload: { name, leagueId }
});
