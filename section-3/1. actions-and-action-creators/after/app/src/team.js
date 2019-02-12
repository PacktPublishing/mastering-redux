const ADD_ITEM = 'mastering-redux/team/ADD_ITEM';
const SET_ACTIVE_ITEM = 'mastering-redux/team/SET_ACTIVE_ITEM';
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      return { ...state, ...action.payload };
    }
    case SET_ACTIVE_ITEM: {
      return { ...state, ...action.payload };
    }
    case SET_ACTIVE_LEAGUE: {
      return { ...state, active_league: action.payload.league, active_team: null };
    }
    case SET_ACTIVE_TEAM: {
      return { ...state, active_team: action.payload.team };
    }
    case ADD_MEMBER: {
      return { ...state, members: [...state.members, action.payload.member] };
    }
    case ADD_TEAM: {
      return { ...state, teams: [...state.teams, action.payload.team] };
    }
    default:
      return state;
  }
}

export const addItem = (item, itemType) => (dispatch, getState) => {
  const state = getState();
  const childColumn = {
    leagues: 'teams',
    teams: 'members'
  };
  const childType = childColumn[itemType];
  const parentTypeKey = itemType.slice(0, -1);
  const childTypeKey = childType.slice(0, -1);
  const childItem = {
    [`${parentTypeKey}Id`]: item.id,
    id: state[childType].length + 1,
    name: `New ${childTypeKey}`
  };
  const newList =  [...state[childType], childItem];
  dispatch({
    type: ADD_ITEM,
    payload: { [childType]: newList, [`active_${parentTypeKey}`]: item.id }
  })
};

export const setActiveItem = (activeItem, itemType) => {
  const activeKey = itemType.slice(0, -1);

  return ({
    type: SET_ACTIVE_ITEM,
    payload: {
      active_team: null,
      [`active_${activeKey}`]: activeItem.id
    }
  })
};


export const setActiveTeam = team => ({
  type: SET_ACTIVE_TEAM,
  payload: {
    active_team: team.id
  }
});

export const setActiveLeague = league => ({
  type: SET_ACTIVE_LEAGUE,
  payload: {
    active_team: league.id
  }
});

export const addMember = item => ({
  type: ADD_MEMBER,
  payload: { item }
});

export const addTeam = item => ({
  type: ADD_TEAM,
  payload: { item }
});
