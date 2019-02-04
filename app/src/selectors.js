import { createSelector } from 'reselect';

const getActiveLeague = state => state.league.active;
const getLeaguesLoading = state => state.league && state.league.loading;

const getActiveTeam = state => state.team.active;
const getTeamsLoading = state => state.team && state.team.loading;

const getMembersLoading = state => state.member && state.member.loading;

const getCache = (state, cache) => cache;

export const getLeaguesIds = (state, cache) =>
  Array.from(cache.keys('leagues'));

export const getActiveTeamsIds = createSelector(
  [getActiveLeague, getTeamsLoading, getCache],
  (activeLeague, loading, cache) => {
    if (loading) return [];

    return Array.from(cache.values('teams'))
      .filter(t => t.leagueId === activeLeague)
      .map(t => t.id);
  }
);

export const getActiveMembersIds = createSelector(
  [getActiveTeam, getMembersLoading, getCache],
  (activeTeam, loading, cache) => {
    if (loading) return [];

    return Array.from(cache.values('members'))
      .filter(m => m.teamId === activeTeam)
      .map(m => m.id);
  }
);

export const getPanelColumns = createSelector(
  [
    getLeaguesIds,
    getActiveTeamsIds,
    getActiveMembersIds,
    getLeaguesLoading,
    getTeamsLoading,
    getMembersLoading
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

export const getInfoDetails = (payload, cache) => {
  const { level, id } = payload;
  const detailsList = Array.from(cache.get('details'));
  const entry = detailsList.find(e => e[`_${level}Id`] === parseInt(id, 10));
  return entry || null;
};
