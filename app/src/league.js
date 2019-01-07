import produce from 'immer';
import { createAction } from 'redux-actions';
import { ADD_TEAM } from 'team';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';
import { delay } from 'lodash-es';

const reducerName = 'league';

export const SET_LEAGUE_DATA = `mastering-redux/${reducerName}/SET_LEAGUE_DATA`;
export const SET_ACTIVE_LEAGUE = `mastering-redux/${reducerName}/SET_ACTIVE_LEAGUE`;
export const UPDATE_LEAGUE_NAME = `mastering-redux/${reducerName}/UPDATE_LEAGUE_NAME`;
export const SET_LEAGUE_LOADING = `mastering-redux/${reducerName}/SET_LEAGUE_LOADING`;

export const initialState = {
  data: {},
  active: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LEAGUE_LOADING: {
      debugger;
      return produce(state, draft => {
        draft.loading = action.payload;
      });
    }
    case SET_LEAGUE_DATA: {
      return produce(state, draft => {
        draft.data = {};
        action.payload.forEach(item => {
          draft.data[item.id] = item;
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
      return produce(state, draft => {
        draft.active = action.payload.leagueId;
      });
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

export const setLeagueData = createAction(SET_LEAGUE_DATA);
export const setLeagueLoading = createAction(SET_LEAGUE_LOADING);

export const setActiveLeague = createAction(
  SET_ACTIVE_LEAGUE,
  league => league.id
);
export const updateLeagueName = createAction(
  UPDATE_LEAGUE_NAME,
  (name, leagueId) => ({ name, leagueId })
);

// thunk

export const getLeagueData = () => async dispatch => {
  dispatch(setLeagueLoading(true));
  try {
    const leagues = await API('leagues');
    dispatch(setLeagueData(leagues));
    delay(() => dispatch(setLeagueLoading(false)), 700);
  } catch (e) {
    console.error(e);
    delay(() => dispatch(setLeagueLoading(false)), 700);
  }
};
