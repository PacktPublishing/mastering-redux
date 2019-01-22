import { createSelector } from 'reselect';

const getActiveLeague = state => state.league.active;
const getAllLeagues = state => state.league && state.league.data;
const getLeaguesLoading = state => state.league && state.league.loading;

const getActiveTeam = state => state.team.active;
const getAllTeams = state => state.team && state.team.data;
const getTeamsLoading = state => state.team && state.team.loading;

const getAllMembers = state => state.member && state.member.data;
const getMembesrLoading = state => state.member && state.member.loading;

export const getLocationPayload = state => state.location.payload;

const getAllDetails = state => state.details && state.details.data;

export const getLeaguesIds = createSelector(
  getAllLeagues,
  (leagues = {}) => Object.keys(leagues)
);

export const getActiveTeamsIds = createSelector(
  [getActiveLeague, getAllTeams],
  (activeLeague, teams = {}) => {
    const activeTeams = Object.values(teams).filter(
      t => t.leagueId === activeLeague
    );
    return activeTeams.map(t => t.id);
  }
);

export const getActiveMembersIds = createSelector(
  [getActiveTeam, getAllMembers],
  (activeTeam, members = {}) => {
    const activeMembers = Object.values(members).filter(
      m => m.teamId === activeTeam
    );
    return activeMembers.map(m => m.id);
  }
);

export const getPanelColumns = createSelector(
  [
    getLeaguesIds,
    getActiveTeamsIds,
    getActiveMembersIds,
    getLeaguesLoading,
    getTeamsLoading,
    getMembesrLoading
  ],
  (leagues, teams, members, leaguesLoading, teamsLoading, membersLoading) => [
    {
      items: leagues,
      type: 'league',
      loading: leaguesLoading
    },
    {
      items: teams,
      type: 'team',
      loading: teamsLoading
    },
    {
      items: members,
      type: 'member',
      loading: membersLoading
    }
  ]
);

export const getInfoEntityDataItem = createSelector(
  [getAllLeagues, getAllTeams, getAllMembers, getLocationPayload],
  (league, team, member, payload) => {
    const { level, id } = payload;
    const entities = { league, team, member };
    return entities[level] && entities[level][id];
  }
);

export const getInfoDetails = createSelector(
  [getLocationPayload, getAllDetails],
  (payload, details) => {
    if (!details) return null;
    const { level, id } = payload;
    const detailsList = details ? Object.values(details) : [];
    const entry = detailsList.find(e => e[`_${level}Id`] === parseInt(id, 10));
    return entry || null;
  }
);
