import { createSelector } from 'reselect';

const getActiveLeague = state => state.league.active;
const getAllLeagues = state => state.league && state.league.data;

const getActiveTeam = state => state.team.active;
const getAllTeams = state => state.team && state.team.data;

const getAllMembers = state => state.member && state.member.data;

export const getLocationPayload = state => state.location.payload;

const getAllDetails = state => state.details && state.details.data;

export const getLeaguesIds = createSelector(
  getAllLeagues,
  (leagues = {}) => Object.keys(leagues)
);

export const getActiveTeamsIds = createSelector(
  [getActiveLeague, getAllTeams],
  (activeLeague, teams = {}) => {
    const activeTeams = Object.values(teams).filter(t => t.leagueId === activeLeague);
    return activeTeams.map(t => t.id);
  }
);

export const getActiveMembersIds = createSelector(
  [getActiveTeam, getAllMembers],
  (activeTeam, members = {}) => {
    const activeMembers = Object.values(members).filter(m => m.teamId === activeTeam);
    return activeMembers.map(m => m.id);
  }
);

export const getPanelColumns = createSelector(
  [getLeaguesIds, getActiveTeamsIds, getActiveMembersIds],
  (leagues, teams, members) => [
    {
      items: leagues,
      type: 'league'
    },
    {
      items: teams,
      type: 'team'
    },
    {
      items: members,
      type: 'member'
    }
  ]
);


export const getInfoDetails = createSelector([
  getLocationPayload,
  getAllLeagues,
  getAllTeams,
  getAllMembers,
  getAllDetails
], (payload, league, team, member, details) => {
  if (!details) return null;
  const { level, id } = payload;
  const entity = { league, team, member }[level];
  const detailsId = entity && entity[id] && entity[id].detailsId;
  return detailsId ? (details[detailsId] || null) : {};
});
