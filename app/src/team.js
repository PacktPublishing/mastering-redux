import produce from 'immer';
import { createAction } from 'redux-actions';
import { SET_ACTIVE_LEAGUE } from 'league';
import { ADD_MEMBER } from 'member';

export const SET_ACTIVE_TEAM = 'mastering-redux/team/SET_ACTIVE_TEAM';
export const ADD_TEAM = 'mastering-redux/team/ADD_TEAM';
export const UPDATE_TEAM_NAME = 'mastering-redux/team/UPDATE_TEAM_NAME';

export const initialState = {
  data: [{ id: 1, name: 'Team 1', leagueId: 1 }],
  active: null
};

export const updateListInState = (data, id, name) => {
  const toUpdate = data.find(m => m.id === id);
  toUpdate.name = name;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_TEAM: {
      return produce(state, draft => {
        draft.active = action.payload;
      });
    }
    case SET_ACTIVE_LEAGUE: {
      return produce(state, draft => {
        draft.active = null;
      });
    }
    case ADD_TEAM: {
      const team = action.payload;
      return produce(state, draft => {
        draft.data.push(team);
      });
    }
    case ADD_MEMBER: {
      return produce(state, draft => {
        draft.active = action.payload.teamId;
      });
    }
    case UPDATE_TEAM_NAME: {
      const { name, teamId } = action.payload;
      return produce(state, draft =>
        updateListInState(draft.data, teamId, name)
      );
    }
    default:
      return state;
  }
}

export const setActiveTeam = createAction(SET_ACTIVE_TEAM, team => team.id);

export const addTeam = createAction(ADD_TEAM);

export const updateTeamName = createAction(
  UPDATE_TEAM_NAME,
  (name, teamId) => ({ name, teamId })
);