import produce from 'immer';
import { createAction } from 'redux-actions';
import { handle } from 'redux-pack';
import { SET_ACTIVE_LEAGUE } from 'src/league/league';
import { CREATE_MEMBER_AND_DETAILS } from 'src/member/member';
import reducerRegistry from 'src/reducerRegistry';
import API from 'src/api.service';

const reducerName = 'team';

export const GET_TEAM_DATA = `mastering-redux/${reducerName}/GET_TEAM_DATA`;
export const SET_ACTIVE_TEAM = `mastering-redux/${reducerName}/SET_ACTIVE_TEAM`;
export const ADD_TEAM = `mastering-redux/${reducerName}/ADD_TEAM`;
export const UPDATE_TEAM_NAME = `mastering-redux/${reducerName}/UPDATE_TEAM_NAME`;

const defaultTeam = { name: 'New Team' };

export const initialState = {
  data: {},
  active: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_DATA: {
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          }),
        success: s =>
          produce(s, draft => {
            draft.data = {};
            action.payload.forEach(item => {
              draft.data[item.id] = item;
            });
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
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          }),
        success: s =>
          produce(s, draft => {
            const team = action.payload;
            draft.data[team.id] = { ...defaultTeam, ...team };
            draft.active = null;
          })
      });
    }
    case CREATE_MEMBER_AND_DETAILS: {
      return handle(state, action, {
        success: s =>
          produce(s, draft => {
            const { member } = action.payload;
            draft.active = member.teamId;
          })
      });
    }
    case UPDATE_TEAM_NAME: {
      return handle(state, action, {
        start: s =>
          produce(s, draft => {
            draft.loading = true;
          }),
        finish: s =>
          produce(s, draft => {
            draft.loading = false;
          }),
        success: s =>
          produce(s, draft => {
            const { name, id } = action.payload;
            draft.data[id].name = name;
          })
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setActiveTeam = createAction(SET_ACTIVE_TEAM, team => team.id);

// thunk

export const getTeamData = () => ({
  type: GET_TEAM_DATA,
  promise: API('teams')
});

export const addTeam = ({ leagueId }) => {
  const team = { ...defaultTeam, leagueId };
  return {
    type: ADD_TEAM,
    promise: API.post('teams', team)
  };
};

export const updateTeamName = (name, teamId) => ({
  type: UPDATE_TEAM_NAME,
  promise: API.patch(`teams/${teamId}`, { name })
});
