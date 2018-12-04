import produce from 'immer';
import { createAction } from 'redux-actions';
import { ADD_TEAM } from 'team';
import reducerRegistry from 'reducerRegistry';

const reducerName = 'league';

export const SET_ACTIVE_LEAGUE = `mastering-redux/${reducerName}/SET_ACTIVE_LEAGUE`;
export const UPDATE_LEAGUE_NAME = `mastering-redux/${reducerName}/UPDATE_LEAGUE_NAME`;

export const initialState = {
  data: {
    1: { id: 1, name: 'League 1' },
    2: { id: 2, name: 'League 2' }
  },
  active: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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

export const setActiveLeague = createAction(
  SET_ACTIVE_LEAGUE,
  league => league.id
);
export const updateLeagueName = createAction(
  UPDATE_LEAGUE_NAME,
  (name, leagueId) => ({ name, leagueId })
);
