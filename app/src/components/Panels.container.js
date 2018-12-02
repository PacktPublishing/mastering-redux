import React from 'react';
import { connect } from 'react-redux';
import Panels from 'components/Panels';

const mapStateToProps = state => {
  const { data: leagues, active: activeLeague } = state.league;
  const { data: teams, active: activeTeam } = state.team;
  const { data: members } = state.member;
  const activeTeams = Object.values(teams).filter(t => t.leagueId === activeLeague);
  const activeMembers = Object.values(members).filter(m => m.teamId === activeTeam);
  return {
    leagues: Object.keys(leagues),
    teams: activeTeams.map(t => t.id),
    members: activeMembers.map(m => m.id)
  };
};

export default connect(
  mapStateToProps
)(Panels);
