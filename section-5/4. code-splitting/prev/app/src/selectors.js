import { createSelector } from 'reselect';

const getActiveLeague = state => state.league.active;
const getAllLeagues = state => state.league.data;

const getActiveTeam = state => state.team.active;
const getAllTeams = state => state.team.data;

const getAllMembers = state => state.member.data;

export const getLeaguesIds = createSelector(getAllLeagues, leagues => Object.keys(leagues));

export const getActiveTeamsIds = createSelector(
  [getActiveLeague, getAllTeams],
  (activeLeague, teams) => {
    const activeTeams = Object.values(teams).filter(t => t.leagueId === activeLeague);
    return activeTeams.map(t => t.id);
  }
);

export const getActiveMembersIds = createSelector(
  [getActiveTeam, getAllMembers],
  (activeTeam, members) => {
    const activeMembers = Object.values(members).filter(m => m.teamId === activeTeam);
    return activeMembers.map(m => m.id);
  }
);