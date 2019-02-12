import { createContext } from 'react';

export const initialState = {
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
  activeLeague: null,
  activeTeam: null
};

export default createContext(initialState);