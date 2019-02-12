import React  from 'react';
import App from 'components/App';
import TeamContext, { initialState } from 'TeamContext';

class AppContainer extends React.PureComponent {
  state = initialState;

  addMember = () => this.setState(state => {
    const newMember = {
      id: state.members.length + 1,
      name: 'New Member',
      teamId: state.activeTeam
    };
    return { members: [...state.members, newMember] };
  });

  addTeam = () => this.setState(state => {
    const newTeam = {
      id: state.teams.length + 1,
      name: 'New Team',
      leagueId: state.activeLeague
    };
    return { teams: [...state.teams, newTeam] };
  });

  setActiveTeam = team => this.setState({ activeTeam: team.id });

  setActiveLeague = league => this.setState({ activeLeague: league.id, activeTeam: null });

  render() {
    return (
      <TeamContext.Provider value={this.state}>
        <App
          addMember={this.addMember}
          addTeam={this.addTeam}
          setActiveTeam={this.setActiveTeam}
          setActiveLeague={this.setActiveLeague}
        />
      </TeamContext.Provider>
    );
  }
}

export default AppContainer;
