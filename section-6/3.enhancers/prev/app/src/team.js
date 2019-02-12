import produce from 'immer';
import { createAction } from 'redux-actions';
import { SET_ACTIVE_LEAGUE } from 'league';
import { ADD_MEMBER } from 'member';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';

const reducerName = 'team';


export const SET_TEAM_DATA = `mastering-redux/${reducerName}/SET_TEAM_DATA`;
export const SET_ACTIVE_TEAM = `mastering-redux/${reducerName}/SET_ACTIVE_TEAM`;
export const ADD_TEAM = `mastering-redux/${reducerName}/ADD_TEAM`;
export const UPDATE_TEAM_NAME = `mastering-redux/${reducerName}/UPDATE_TEAM_NAME`;

const defaultTeam = { name: 'New Team' };

export const initialState = {
  data: {},
  active: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAM_DATA: {
      return produce(state, draft => {
        action.payload.forEach(item => {
          draft.data[item.id] = item;
        })
      });
    }
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
      const { leagueId } = action.payload;
      return produce(state, draft => {
        const teamId = Object.keys(draft.data).length + 1;
        draft.data[teamId] = { ...defaultTeam, leagueId, id: teamId };
      });
    }
    case ADD_MEMBER: {
      return produce(state, draft => {
        draft.active = action.payload.teamId;
      });
    }
    case UPDATE_TEAM_NAME: {
      const { name, teamId } = action.payload;
      return produce(state, draft => {
        const item = draft.data[teamId];
        item.name = name;
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setTeamData = createAction(SET_TEAM_DATA);

export const setActiveTeam = createAction(SET_ACTIVE_TEAM, team => team.id);

export const addTeam = createAction(ADD_TEAM);

export const updateTeamName = createAction(
  UPDATE_TEAM_NAME,
  (name, teamId) => ({ name, teamId })
);

// thunk

export const getTeamData = () => async dispatch => {
  const teams = await API('teams');
  dispatch(setTeamData(teams));
};

