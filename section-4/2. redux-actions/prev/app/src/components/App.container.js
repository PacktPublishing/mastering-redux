import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import {
  addTeam,
  addMember,
  setActiveTeam,
  setActiveLeague,
  updateTeamName,
  updateLeagueName,
  updateMemberName
} from 'team';

const mapStateToProps = state => {
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
  updateTeamName,
  setActiveLeague,
  updateLeagueName,
  updateMemberName
};

class AppContainer extends React.PureComponent {
  addItem = (item, type) => {
    const { addMember, addTeam, members, teams } = this.props;
    const newItem = {};

    if (type === 'teams') {
      newItem.id = members.length + 1;
      newItem.name = 'New member';
      newItem.teamId = item.id;
      addMember(newItem);
    } else if (type === 'leagues') {
      newItem.id = teams.length + 1;
      newItem.name = 'New team';
      newItem.leagueId = item.id;
      addTeam(newItem);
    }
  };

  setActiveItem = (item, type) => {
    if (type === 'teams') {
      this.props.setActiveTeam(item);
    } else if (type === 'leagues') {
      this.props.setActiveLeague(item);
    }
  };

  updateName = (name, item, type) => {
    if (type === 'members') {
      this.props.updateMemberName(name, item.id);
    } else if (type === 'teams') {
      this.props.updateTeamName(name, item.id);
    } else if (type === 'leagues') {
      this.props.updateLeagueName(name, item.id);
    }
  };

  render() {
    return (
      <App
        {...this.props}
        addItem={this.addItem}
        updateName={this.updateName}
        setActiveItem={this.setActiveItem}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
