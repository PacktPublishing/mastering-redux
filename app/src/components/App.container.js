import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import { addTeam, addMember, setActiveTeam, setActiveLeague } from 'team';

const mapStateToProps = (state) => {
  const {
    teams,
    leagues,
    members,
    active_team: activeTeam,
    active_league: activeLeague
  } = state;
  return {
    teams,
    leagues,
    members,
    activeTeam,
    activeLeague
  };
};

const mapDispatchToProps = {
  addTeam,
  addMember,
  setActiveTeam,
  setActiveLeague
};

class AppContainer extends React.PureComponent {

  addItem = (item, type) => {
    const { activeLeague, activeTeam, addMember, addTeam, members, teams } = this.props;
    const newItem = {};

    if (type === 'teams') {
      newItem.id = members.length + 1;
      newItem.name = 'New member';
      newItem.teamId = activeTeam;
      addMember(newItem);
    } else if (type === 'leagues') {
      newItem.id = teams.length + 1;
      newItem.name = 'New team';
      newItem.leagueId = activeLeague;
      addTeam(newItem)
    }
  };

  setActiveItem = (item, type) => {
    if (type === 'teams') {
      this.props.setActiveTeam(item);
    } else if (type === 'leagues') {
      this.props.setActiveLeague(item);
    }
  };

  render() {
    return (
      <App {...this.props} addItem={this.addItem} setActiveItem={this.setActiveItem} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
