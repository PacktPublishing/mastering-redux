import produce from 'immer';
import { createAction } from 'redux-actions';
import { handle } from 'redux-pack';
import { ADD_TEAM } from 'team/team';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';

const reducerName = 'league';

export const GET_LEAGUE_DATA = `mastering-redux/${reducerName}/GET_LEAGUE_DATA`;
export const SET_ACTIVE_LEAGUE = `mastering-redux/${reducerName}/SET_ACTIVE_LEAGUE`;
export const UPDATE_LEAGUE_NAME = `mastering-redux/${reducerName}/UPDATE_LEAGUE_NAME`;

export const initialState = {
  data: {},
  active: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEAGUE_DATA: {
      return handle(state, action, {
        start: s => produce(s, draft => { draft.loading = true; }),
        finish: s => produce(s, draft => { draft.loading = false; }),
        success: s => produce(s, draft => {
          action.payload.forEach(item => {
            draft.data[item.id] = item;
          });
        })
      });
    }
    case SET_ACTIVE_LEAGUE: {
      return produce(state, draft => {
        draft.active = action.payload;
      });
    }
    case UPDATE_LEAGUE_NAME: {
      const { name, leagueId } = action.payload;
      return produce(state, draft => {
        const league = draft.data[leagueId];
        league.name = name;
      });
    }
    case ADD_TEAM: {
      return handle(state, action, {
        success: s => produce(s, draft => {
          const team = action.payload;
          draft.active = team.leagueId;
        })
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setActiveLeague = createAction(
  SET_ACTIVE_LEAGUE,
  league => league.id
);
export const updateLeagueName = createAction(
  UPDATE_LEAGUE_NAME,
  (name, leagueId) => ({ name, leagueId })
);

// packs

export const getLeagueData = () => ({
  type: GET_LEAGUE_DATA,
  promise: API('leagues')
});
