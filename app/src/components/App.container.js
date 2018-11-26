import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import { addTeam, setActiveTeam, updateTeamName } from 'team';
import { setActiveLeague, updateLeagueName } from 'league';
import { addMember, updateMemberName, editDetailsEntry } from 'member';

const mapStateToProps = state => {
  const { data: leagues, active: activeLeague } = state.league;
  const { data: teams, active: activeTeam } = state.team;
  const { data: members, membersDetails } = state.member;
  return {
    teams,
    leagues,
    members,
    activeTeam,
    activeLeague,
    membersDetails
  };
};

const mapDispatchToProps = {
  addTeam,
  addMember,
  setActiveTeam,
  updateTeamName,
  setActiveLeague,
  updateLeagueName,
  updateMemberName,
  editDetailsEntry
};

class AppContainer extends React.PureComponent {
  addItem = (item, type) => {
    const { addMember, addTeam, members, teams } = this.props;
    const newItem = {};

    if (type === 'teams') {
      newItem.id = members.length + 1;
      newItem.name = 'New member';
      newItem.teamId = item.id;
      newItem.details = { bio: '', age: '' };
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
