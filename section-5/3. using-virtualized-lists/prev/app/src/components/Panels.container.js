import React from 'react';
import { connect } from 'react-redux';
import Panels from 'components/Panels';
import { getLeaguesIds, getActiveTeamsIds, getActiveMembersIds } from 'selectors';

const mapStateToProps = state => ({
  leagues: getLeaguesIds(state),
  teams: getActiveTeamsIds(state),
  members: getActiveMembersIds(state)
});

export default connect(
  mapStateToProps
)(Panels);
