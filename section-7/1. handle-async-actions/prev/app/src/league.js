import produce from 'immer';
import { createAction } from 'redux-actions';
import { ADD_TEAM } from 'team';
import reducerRegistry from 'reducerRegistry';
import API from 'api.service';

const reducerName = 'league';

export const SET_LEAGUE_DATA = `mastering-redux/${reducerName}/SET_LEAGUE_DATA`;
export const SET_ACTIVE_LEAGUE = `mastering-redux/${reducerName}/SET_ACTIVE_LEAGUE`;
export const UPDATE_LEAGUE_NAME = `mastering-redux/${reducerName}/UPDATE_LEAGUE_NAME`;

export const initialState = {
  data: {},
  active: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LEAGUE_DATA: {
      return produce(state, draft => {
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
  const leagues = await API('leagues');
  if (leagues) dispatch(setLeagueData(leagues));
};
