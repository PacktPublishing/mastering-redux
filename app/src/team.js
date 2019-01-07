import produce from 'immer';
import { createAction } from 'redux-actions';
import { SET_ACTIVE_LEAGUE } from 'league';
import { ADD_MEMBER } from 'member';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';
import { delay } from 'lodash-es';

const reducerName = 'team';

export const SET_TEAM_DATA = `mastering-redux/${reducerName}/SET_TEAM_DATA`;
export const SET_TEAM_LOADING = `mastering-redux/${reducerName}/SET_TEAM_LOADING`;
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
    case SET_TEAM_LOADING: {
      return produce(state, draft => {
        draft.loading = action.payload;
      });
    }
    case SET_TEAM_DATA: {
      return produce(state, draft => {
        draft.data = {};
        action.payload.forEach(item => {
          draft.data[item.id] = item;
        });
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
      const team = action.payload;
      return produce(state, draft => {
        draft.data[team.id] = { ...defaultTeam, ...team };
        draft.active = null;
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

export const setTeamLoading = createAction(SET_TEAM_LOADING);

export const setActiveTeam = createAction(SET_ACTIVE_TEAM, team => team.id);

export const addTeam = createAction(ADD_TEAM);

export const updateTeamName = createAction(UPDATE_TEAM_NAME);

// thunk

export const getTeamData = () => async dispatch => {
  dispatch(setTeamLoading(true));
  try {
    const teams = await API('teams');
    dispatch(setTeamData(teams));
    delay(() => dispatch(setTeamLoading(false)), 700);
  } catch (e) {
    console.error(e);
    delay(() => dispatch(setTeamLoading(false)), 700);
  }
};

export const postTeamData = ({ leagueId }) => async dispatch => {
  dispatch(setTeamLoading(true));
  const team = { ...defaultTeam, leagueId };
  try {
    const newTeam = await API.post('teams', team);
    dispatch(addTeam({ ...team, id: newTeam.id }));
    delay(() => dispatch(setTeamLoading(false)), 700);
  } catch (e) {
    console.error(e);
    delay(() => dispatch(setTeamLoading(false)), 700);
  }
};

export function postTeamData2({ leagueId }) {
  const team = { ...defaultTeam, leagueId };
  return function postTeamDataThunk(dispatch) {
    dispatch(setTeamLoading(false));
    API.post('teams', team)
      .then(newTeam => {
        dispatch(addTeam({ ...team, id: newTeam.id }));
        delay(() => dispatch(setTeamLoading(false)), 700);
      }
      )
      .catch(e => {
        console.error(e);
        delay(() => dispatch(setTeamLoading(false)), 700);
      });
  };
}

export const patchTeamName = (name, teamId) => async dispatch => {
  const newTeam = { name };
  dispatch(setTeamLoading(true));
  try {
    await API.patch(`teams/${teamId}`, newTeam);
    dispatch(updateTeamName({ name, teamId }));
    delay(() => dispatch(setTeamLoading(false)), 700);
  } catch (e) {
    console.error(e);
    delay(() => dispatch(setTeamLoading(false)), 700);
  }
};
